import {useState, useEffect, useRef, useContext} from "react"
import blogService from "./services/blogs"
import loginService from "./services/login.js"
import Notification from "./components/Notification.jsx"
import LoginForm from "./components/LoginForm.jsx"
import Togglable from "./components/Togglable.jsx"
import BlogForm from "./components/BlogForm.jsx"
import {useNotificationDispatch} from "./NotificationContext.jsx"
import UserContext from "./UserContext.jsx"
import {Routes, Route, Link} from 'react-router-dom'
import Users from "./components/Users.jsx"
import Blogs from "./components/Blogs.jsx"
import User from "./components/User.jsx"
import Blog from "./components/Blog.jsx"

const App = () => {
    const notificationDispatch = useNotificationDispatch()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, userDispatch] = useContext(UserContext)

    useEffect(() => {
        const loggedUser = window.localStorage.getItem("user")
        if (loggedUser) {
            const user = JSON.parse(loggedUser);
            userDispatch({type: 'LOGIN', payload: user})
            blogService.setToken(user.token);
        }
    }, []);

    const blogFormRef = useRef();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({username, password});
            blogService.setToken(user.token);
            setUsername("");
            setPassword("");
            window.localStorage.setItem("user", JSON.stringify(user));
            userDispatch({type: 'LOGIN', payload: user})
            notificationDispatch({type: 'SHOW', payload: 'You were logged in'})
            setTimeout(() => {
                notificationDispatch({type: 'HIDE'})
            }, 5000);
        } catch (exception) {
            notificationDispatch({type: 'SHOW', payload: 'Wrong credentials'})
            setTimeout(() => {
                notificationDispatch({type: 'HIDE'})
            }, 5000);
        }
    };

    const handleLogout = () => {
        window.localStorage.removeItem("user");
        userDispatch({type: 'LOGOUT'})
        notificationDispatch({type: 'SHOW', payload: 'You were logged out'})
        setTimeout(() => {
            notificationDispatch({type: 'HIDE'})
        }, 5000);
    };

    const blogForm = () => {
        return (
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm ref={blogFormRef}/>
            </Togglable>
        );
    };

    const loginForm = () => {
        return (
            <Togglable buttonLabel="login">
                <LoginForm
                    handleLogin={handleLogin}
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                />
            </Togglable>
        );
    };

    if (user === null) {
        return (
            <div className="container mx-auto">
                <h2>Log in to application</h2>
                <Notification/>
                {loginForm()}
            </div>
        );
    } else {
        return (
            <div>
                <nav className="bg-gray-800">
                    <div className="container mx-auto">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <h2 className="text-white">blog app</h2>
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        <Link to={'/'} className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">blogs</Link>
                                        <Link to={'users'} className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">users</Link>&nbsp;
                                        <div className="text-white flex flex-shrink-0 items-center">
                                            {user.name} logged in
                                        </div>

                                        <div className="text-white flex flex-shrink-0 items-center">
                                            <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-4 rounded">logout</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="container mx-auto py-2">
                    <Routes>
                        <Route path="/users/:id" element={<User/>}/>
                        <Route path="/users" element={<Users/>}/>
                        <Route path="/blogs/:id" element={<Blog/>}/>
                        <Route path="/" element={<Blogs blogForm={blogForm}/>}/>
                    </Routes>
                </div>
            </div>
        );
    }
};

export default App;
