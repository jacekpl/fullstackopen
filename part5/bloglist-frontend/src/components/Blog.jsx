import {useState} from "react";
import blogs from "../services/blogs.js";

const Blog = ({blog, updateBlog}) => {
    const [visible, setVisible] = useState(false)
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const handleLike = async (event) => {
        event.preventDefault()
        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1,
            user: blog.user.id
        }

        await updateBlog(updatedBlog)
    }

    return (<div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
        {visible && <>
            <div>{blog.url}</div>
            <div>likes {blog.likes ?? 0}
                <button onClick={handleLike}>like</button>
            </div>
            <div>{blog.user?.name ?? 'missing-name'}</div>
        </>
        }
    </div>)
}

export default Blog