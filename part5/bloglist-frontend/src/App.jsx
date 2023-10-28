import {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login.js'
import Notification from "./components/Notification.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Togglable from "./components/Toggable.jsx";
import BlogForm from "./components/BlogForm.jsx";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [message, setMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})
    const [loginVisible, setLoginVisible] = useState(false)

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
            setMessage('You were logged in')
        } catch (exception) {
            setMessage('Wrong credentials')
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('user')
        setUser(null)
        setMessage('You were logged out')
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

    const addBlog = async (event) => {
        event.preventDefault()

        try {
            const addedBlog = await blogService.create(newBlog)
            setBlogs(blogs.concat(addedBlog))
            setNewBlog({title: '', author: '', url: ''})
            setMessage('Blog created')
        } catch (exception) {
            setMessage('Failed to create blog')
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    const blogForm = () => {
        return (
            <Togglable buttonLabel='new blog'>
                <BlogForm
                    newBlog={newBlog}
                    handleTitleChange={handleTitleChange}
                    handleAuthorChange={handleAuthorChange}
                    handleUrlChange={handleUrlChange}
                    addBlog={addBlog}/>
            </Togglable>
        )
    }

    const loginForm = () => {
        return (
            <Togglable buttonLabel='login'>
                <LoginForm
                    handleLogin={handleLogin}
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                />
            </Togglable>
        )
    }

    if (user === null) {
        return (
            <div>
                <h2>log in to application</h2>
                <Notification message={message}/>
                {loginForm()}
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
                <Notification message={message}/>
                {blogForm()}

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