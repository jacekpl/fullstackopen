import {useState, useEffect, useRef, useContext} from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login.js";
import Notification from "./components/Notification.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Togglable from "./components/Togglable.jsx";
import BlogForm from "./components/BlogForm.jsx";
import {useNotificationDispatch} from "./NotificationContext.jsx";
import {useQuery} from "react-query";
import UserContext from "./UserContext.jsx";

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

    const result = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => await blogService.getAll()
    })

    if (result.isLoading) {
        return <div>loading data...</div>
    }

    const blogs = result.data

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
            <div>
                <h2>log in to application</h2>
                <Notification/>
                {loginForm()}
            </div>
        );
    } else {
        return (
            <div>
                <h2>blogs</h2>
                <p>
                    {user.name} logged in
                    <button onClick={handleLogout}>logout</button>
                </p>

                <h2>create new</h2>
                <Notification/>
                {blogForm()}

                <div>
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </div>
            </div>
        );
    }
};

export default App;
