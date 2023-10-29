import {useState, useEffect, useRef} from 'react'
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

    useEffect(() => {
        async function fetchData() {
            const blogs = await blogService.getAll()
            setBlogs(blogs)
        }
        fetchData()
    }, [])

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('user')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const blogFormRef = useRef()

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
            setTimeout(() => {
                setMessage(null)
            }, 5000)
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
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const addBlog = async (newBlog) => {
        try {
            await blogService.create(newBlog)
            const blogs = await blogService.getAll()
            setBlogs(blogs)
            blogFormRef.current.toggleVisibility()
            setMessage('Blog created')
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        } catch (exception) {
            setMessage('Failed to create blog')
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    const updateBlog = async (blog) => {
        try {
            await blogService.update(blog.id, blog)
            const blogs = await blogService.getAll()
            setBlogs(blogs)
            setMessage('Blog updated')
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        } catch (exception) {
            setMessage('Failed to update blog')
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    const removeBlog = async (id) => {
        try {
            await blogService.remove(id)
            const blogs = await blogService.getAll()
            setBlogs(blogs)
            setMessage('Blog removed')
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        } catch (exception) {
            setMessage('Failed to remove blog')
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    const blogForm = () => {
        return (
            <Togglable buttonLabel='new blog' ref={blogFormRef}>
                <BlogForm createBlog={addBlog}/>
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
                        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} user={user}/>
                    )}
                </div>
            </div>
        )
    }
}

export default App