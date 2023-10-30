import {useState} from "react";
import PropTypes from "prop-types";

const Blog = ({blog, updateBlog, removeBlog, user}) => {
    const [visible, setVisible] = useState(false)
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    //if anyone should be able to like a blog (not only an author), we would need a separate endpoint in the backend for liking a blog. I haven't seen such requirement in the exercise, so I didn't implement it.
    const handleLike = async (event) => {
        event.preventDefault()
        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1,
            user: blog.user.id
        }

        await updateBlog(updatedBlog)
    }

    const handleRemove = (event) => {
        event.preventDefault()
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            removeBlog(blog.id)
        }
    }

    return (<div style={blogStyle}>
        <span className="title">{blog.title}</span> <span className="author">{blog.author}</span>
        <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
        {visible && <>
            <div className="url">{blog.url}</div>
            <div className="likes">likes {blog.likes ?? 0}
                <button onClick={handleLike}>like</button>
            </div>
            <div className="user">{blog.user?.name ?? 'missing-name'}</div>
            {blog.user.username === user.username &&
                <button onClick={handleRemove}>remove</button>
            }
        </>
        }
    </div>)
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    updateBlog: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

export default Blog