const BlogForm = ({newBlog, handleTitleChange, handleAuthorChange, handleUrlChange, addBlog}) => {
    return (
        <>
            <div>
                title
                <input type="text" value={newBlog.title} onChange={handleTitleChange}/>
            </div>

            <div>
                author
                <input type="text" value={newBlog.author} onChange={handleAuthorChange}/>
            </div>

            <div>
                url
                <input type="text" value={newBlog.url} onChange={handleUrlChange}/>
            </div>

            <button onClick={addBlog}>create</button>
        </>
    )
}

export default BlogForm