const {ApolloServer} = require('@apollo/server')
const {startStandaloneServer} = require('@apollo/server/standalone')
const {v1: uuid} = require('uuid')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/Author')
const Book = require('./models/Book')

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
        authorCount: () => authors.length,
        allBooks: async (root, args) => {
            console.log(args)
            if (!args.author || !args.genre) {
                return await Book.find({})
            }

            if (args.author) {
                books = [] //books.filter(b => b.author === args.author)
            }

            if (args.genre) {
                books = [] //books.filter(b => b.genres.includes(args.genre))
            }

            return books
        },
        allAuthors: async () => await Author.find({}),
    },
    Author: {
        bookCount: (root) => {
            return 0 //books.filter(b => b.author === root.name).length
        }
    },
    Mutation: {
        addBook: async (root, args) => {
            const author = await Author.findOne({ name: args.author })
            const book = new Book({...args, author})
            return book.save()
        },

        editAuthor: (root, args) => {
            const author = authors.find(a => a.name === args.name)
            if (!author) {
                return null
            }

            const updatedAuthor = {...author, born: args.setBornTo}
            authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
            return updatedAuthor
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