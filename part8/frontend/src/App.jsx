import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from "./components/LoginForm.jsx";
import {useApolloClient, useSubscription} from "@apollo/client";
import Recommend from "./components/Recommend.jsx";
import {ALL_BOOKS, BOOK_ADDED} from "./queries.js";

export const updateCache = (cache, query, addedBook) => {
    // helper that is used to eliminate saving same person twice
    const uniqByName = (a) => {
        let seen = new Set()
        return a.filter((item) => {
            let k = item.title
            return seen.has(k) ? false : seen.add(k)
        })
    }

    cache.updateQuery(query, ({ allBooks }) => {
        return {
            allBooks: uniqByName(allBooks.concat(addedBook)),
        }
    })
}

const App = () => {
    const [page, setPage] = useState('authors')
    const [token, setToken] = useState(localStorage.getItem('user-token'))
    const client = useApolloClient()
    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }

    if (!token) {
        return (
            <div>
                <h2>Login</h2>
                <LoginForm setToken={setToken}/>
            </div>
        )
    }

    useSubscription(BOOK_ADDED, {
        onData: ({ data }) => {
            alert('book added')
            const addedBook = data.data.bookAdded
            updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
        }
    })

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                <button onClick={() => setPage('add')}>add book</button>
                <button onClick={() => setPage('recommend')}>recommend</button>
                <button onClick={logout}>logout</button>
            </div>

            <Authors show={page === 'authors'} />

            <Books show={page === 'books'} />

            <NewBook show={page === 'add'} />

            <Recommend show={page === 'recommend'} />
        </div>
    )
}

export default App