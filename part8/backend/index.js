const {ApolloServer} = require('@apollo/server')
const {startStandaloneServer} = require('@apollo/server/standalone')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const {GraphQLError} = require("graphql/error");
const jwt = require('jsonwebtoken')

require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const typeDefs = `
  type Book {
    title: String
    published: Int
    author: Author!
    id: ID
    genres: [String]
  }
  
  type Author {
    name: String
    born: Int
    bookCount: Int
  }
  
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
    
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author!]!
    me: User
  }
  
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book!
    
    editAuthor(
      name: String!
      setBornTo: Int!
     ): Author
     
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
  
    login(
      username: String!
      password: String!
    ): Token
  }
`

const authors = []

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments({}),
        allBooks: async (root, args) => {
            if (!args.author && !args.genre) {
                books = Book.find({})
            }

            if (args.author && !args.genre) {
                const author = await Author.findOne({name: args.author});
                books = Book.find({author: author._id})
            }

            if (args.genre && !args.author) {
                books = Book.find({genres: {$in: [args.genre]}})
            }

            if (args.genre && args.author) {
                const author = await Author.findOne({name: args.author});
                books = Book.find({genres: {$in: [args.genre]}, author: author._id})
            }


            return books.populate('author');
        },
        allAuthors: async () => await Author.find({}),
        me: (root, args, context) => {
            console.log(context)
            return context.currentUser
        },

    },
    Author: {
        bookCount: async (root) => {
            return Book.collection.countDocuments({author: root._id})
        }
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }

            let author = await Author.findOne({name: args.author})

            if (!author) {
                const newAuthor = new Author({name: args.author})
                author = await newAuthor.save()
            }

            const book = new Book({...args, author})
            return book.save().catch(error => {
                throw new GraphQLError('Saving book failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args,
                        error
                    }
                })
            })
        },

        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }

            const author = await Author.findOne({name: args.name})
            if (!author) {
                return null
            }

            author.born = args.setBornTo

            await author.save().catch(error => {
                throw new GraphQLError('Saving born failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.setBornTo,
                        error
                    }
                })
            })

            return author
        },

        createUser: async (root, args) => {
            const user = new User({username: args.username, favoriteGenre: args.favoriteGenre})

            return user.save()
                .catch(error => {
                    throw new GraphQLError('Creating the user failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.username,
                            error
                        }
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({username: args.username})

            if (!user || args.password !== 'secret') {
                throw new GraphQLError('wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return {value: jwt.sign(userForToken, process.env.JWT_SECRET)}
        },
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: {port: 4000},
    context: async ({req, res}) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
            const currentUser = await User.findById(decodedToken.id)
            return {currentUser}
        }
    },
}).then(({url}) => {
    console.log(`Server ready at ${url}`)
})