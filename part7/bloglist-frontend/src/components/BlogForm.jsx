import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

    const handleTitleChange = (event) => {
        setNewBlog({ ...newBlog, title: event.target.value });
    };

    const handleAuthorChange = (event) => {
        setNewBlog({ ...newBlog, author: event.target.value });
    };

    const handleUrlChange = (event) => {
        setNewBlog({ ...newBlog, url: event.target.value });
    };

    const addBlog = (event) => {
        event.preventDefault();
        createBlog(newBlog);
        setNewBlog({ title: "", author: "", url: "" });
    };

    return (
        <>
            <div>
                title
                <input
                    type="text"
                    id="input-title"
                    role="input-title"
                    value={newBlog.title}
                    onChange={handleTitleChange}
                />
            </div>

            <div>
                author
                <input
                    type="text"
                    id="input-author"
                    role="input-author"
                    value={newBlog.author}
                    onChange={handleAuthorChange}
                />
            </div>

            <div>
                url
                <input type="text" id="input-url" role="input-url" value={newBlog.url} onChange={handleUrlChange} />
            </div>

            <button id="create-button" onClick={addBlog}>
                create
            </button>
        </>
    );
};

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
