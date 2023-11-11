import {useState, useEffect, useRef, useContext} from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login.js";
import Notification from "./components/Notification.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Togglable from "./components/Toggable.jsx";
import BlogForm from "./components/BlogForm.jsx";
import {useNotificationDispatch} from "./NotificationContext.jsx";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const notificationDispatch = useNotificationDispatch()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const blogs = await blogService.getAll();
            setBlogs(blogs);
        }
        fetchData();
    }, []);

    useEffect(() => {
        const loggedUser = window.localStorage.getItem("user");
        if (loggedUser) {
            const user = JSON.parse(loggedUser);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const blogFormRef = useRef();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({ username, password });
            blogService.setToken(user.token);
            setUser(user);
            setUsername("");
            setPassword("");
            window.localStorage.setItem("user", JSON.stringify(user));
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
        setUser(null);
        notificationDispatch({type: 'SHOW', payload: 'You were logged out'})
        setTimeout(() => {
            notificationDispatch({type: 'HIDE'})
        }, 5000);
    };

    const addBlog = async (newBlog) => {
        try {
            await blogService.create(newBlog);
            const blogs = await blogService.getAll();
            setBlogs(blogs);
            blogFormRef.current.toggleVisibility();
            notificationDispatch({type: 'SHOW', payload: 'Blog created'})
            setTimeout(() => {
                notificationDispatch({type: 'HIDE'})
            }, 5000);
        } catch (exception) {
            notificationDispatch({type: 'SHOW', payload: 'Failed to create blog'})
            setTimeout(() => {
                notificationDispatch({type: 'HIDE'})
            }, 5000);
        }
    };

    const updateBlog = async (blog) => {
        try {
            await blogService.update(blog.id, blog);
            const blogs = await blogService.getAll();
            setBlogs(blogs);
            notificationDispatch({type: 'SHOW', payload: 'Blog updated'})
            setTimeout(() => {
                notificationDispatch({type: 'HIDE'})
            }, 5000);
        } catch (exception) {
            notificationDispatch({type: 'SHOW', payload: 'Failed to update blog'})
            setTimeout(() => {
                notificationDispatch({type: 'HIDE'})
            }, 5000);
        }
    };

    const removeBlog = async (id) => {
        try {
            await blogService.remove(id);
            const blogs = await blogService.getAll();
            setBlogs(blogs);
            notificationDispatch({type: 'SHOW', payload: 'Blog removed'})
            setTimeout(() => {
                notificationDispatch({type: 'HIDE'})
            }, 5000);
        } catch (exception) {
            notificationDispatch({type: 'SHOW', payload: 'Failed to remove blog'})
            setTimeout(() => {
                notificationDispatch({type: 'HIDE'})
            }, 5000);
        }
    };

    const blogForm = () => {
        return (
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
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
                        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} user={user} />
                    ))}
                </div>
            </div>
        );
    }
};

export default App;
