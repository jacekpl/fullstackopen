import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from "./components/LoginForm.jsx";
import {useApolloClient, useSubscription} from "@apollo/client";
import Recommend from "./components/Recommend.jsx";
import {BOOK_ADDED} from "./queries.js";

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
            console.log(data)
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