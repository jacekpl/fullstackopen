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
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({username, password})
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

    if (errorMessage) {
        return <Notification message={errorMessage}/>
    }

    console.log(user)
    if (user === null) {
        return (
            <div>
                <h2>log in to application</h2>
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
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog}/>
                )}
            </div>
        )
    }
}

export default App