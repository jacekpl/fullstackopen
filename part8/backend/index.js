const {ApolloServer} = require('@apollo/server')
const {startStandaloneServer} = require('@apollo/server/standalone')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/Author')
const Book = require('./models/Book')
const {GraphQLError} = require("graphql/error");

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
  
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author!]!
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
    },
    Author: {
        bookCount: async (root) => {
            return Book.collection.countDocuments({author: root._id})
        }
    },
    Mutation: {
        addBook: async (root, args) => {
            let author = await Author.findOne({name: args.author})

            if (!author) {
                const newAuthor = new Author({name: args.author})
                author = await newAuthor.save()
            }

            const book = new Book({...args, author})
            try {
                return book.save()
            } catch (error) {
                throw new GraphQLError('Saving book failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args,
                        error
                    }
                })
            }
        },

        editAuthor: async (root, args) => {
            const author = await Author.findOne({name: args.name})
            if (!author) {
                return null
            }

            author.born = args.setBornTo
            try {
                await author.save()
                return author
            } catch (error) {
                throw new GraphQLError('Saving born failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.setBornTo,
                        error
                    }
                })
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: {port: 4000},
}).then(({url}) => {
    console.log(`Server ready at ${url}`)
})