const Book = require("./models/Book");
const Author = require("./models/Author");
const {GraphQLError} = require("graphql/error");
const User = require("./models/User");
const jwt = require("jsonwebtoken");

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

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
            book.save().catch(error => {
                throw new GraphQLError('Saving book failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args,
                        error
                    }
                })
            })

            pubsub.publish('BOOK_ADDED', { bookAdded: book })

            return book
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
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        },
    },
}

module.exports = resolvers
