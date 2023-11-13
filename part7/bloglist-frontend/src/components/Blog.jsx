import {useState} from "react";
import PropTypes from "prop-types";
import {useMutation, useQueryClient} from "react-query";
import blogService from "../services/blogs.js";
import {useNotificationDispatch} from "../NotificationContext.jsx";
import {useUser} from "../UserContext.jsx";

const Blog = ({blog}) => {
    const user = useUser()
    const [visible, setVisible] = useState(false);
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
    };

    const queryClient = useQueryClient()
    const notificationDispatch = useNotificationDispatch()

    const updateBlogMutation = useMutation({
        mutationFn: (updatedBlog) => blogService.update(updatedBlog),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['blogs']})
        },
    })

    const removeBlogMutation = useMutation({
        mutationFn: (id) => blogService.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] })
        },
    })

    //if anyone should be able to like a blog (not only an author), we would need a separate endpoint in the backend for liking a blog. I haven't seen such requirement in the exercise, so I didn't implement it.
    const handleLike = async (event) => {
        event.preventDefault();
        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1,
            user: blog.user.id,
        };

        try {
            await updateBlogMutation.mutate(updatedBlog)
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

    const handleRemove = (event) => {
        event.preventDefault();
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            removeBlog(blog.id);
        }
    }

    const removeBlog = async (id) => {
        try {
            removeBlogMutation.mutate(id)
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
    return (
        <div style={blogStyle} className="blog">
            <span className="title">{blog.title}</span> <span className="author">{blog.author}</span>
            <button className="show-details" onClick={() => setVisible(!visible)}>
                {visible ? "hide" : "view"}
            </button>
            {visible && (
                <>
                    <div className="url">{blog.url}</div>
                    <div className="likes">
                        likes {blog.likes ?? 0}
                        <button onClick={handleLike}>like</button>
                    </div>
                    <div className="user">{blog.user?.name ?? "missing-name"}</div>
                    {blog.user.username === user.username && <button onClick={handleRemove}>remove</button>}
                </>
            )}
        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.object.isRequired
};

export default Blog;
