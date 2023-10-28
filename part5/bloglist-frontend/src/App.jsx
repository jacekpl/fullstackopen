import {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login.js'
import Notification from "./components/Notification.jsx";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('user')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({username, password})
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            window.localStorage.setItem('user', JSON.stringify(user))
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('user')
        setUser(null)
    }

    const handleTitleChange = (event) => {
        setNewBlog({...newBlog, title: event.target.value})
    }

    const handleAuthorChange = (event) => {
        setNewBlog({...newBlog, author: event.target.value})
    }

    const handleUrlChange = (event) => {
        setNewBlog({...newBlog, url: event.target.value})
    }

    const handleCreateBlog = async (event) => {
        event.preventDefault()

        try {
            const addedBlog = await blogService.create(newBlog)
            setBlogs(blogs.concat(addedBlog))
            setNewBlog({title: '', author: '', url: ''})
        } catch (exception) {
            setErrorMessage('Failed to create blog')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    if (user === null) {
        return (
            <div>
                <h2>log in to application</h2>
                <Notification message={errorMessage}/>
                <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input type="text" value={username} name="Username"
                               onChange={({target}) => setUsername(target.value)}/>
                    </div>
                    <div>
                        password
                        <input type="password" value={password} name="Password"
                               onChange={({target}) => setPassword(target.value)}/>
                    </div>
                    <button type="submit">login</button>
                </form>
            </div>
        )
    } else {
        return (
            <div>
                <h2>blogs</h2>
                <p>{user.name} logged in
                    <button onClick={handleLogout}>logout</button>
                </p>

                <h2>create new</h2>
                <Notification message={errorMessage}/>
                <div>
                    title
                    <input type="text" value={newBlog.title} onChange={handleTitleChange}/>
                </div>

                <div>
                    author
                    <input type="text" value={newBlog.author} onChange={handleAuthorChange}/>
                </div>

                <div>
                    url
                    <input type="text" value={newBlog.url} onChange={handleUrlChange}/>
                </div>

                <button onClick={handleCreateBlog}>create</button>

                <div>
                    {blogs.map(blog =>
                        <Blog key={blog.id} blog={blog}/>
                    )}
                </div>
            </div>
        )
    }
}

export default App