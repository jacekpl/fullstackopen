import {forwardRef, useState} from "react";
import {useNotificationDispatch} from "../NotificationContext.jsx";
import {useMutation, useQueryClient} from "react-query";
import blogService from "../services/blogs.js";

const BlogForm = forwardRef((props, ref) => {
    const notificationDispatch = useNotificationDispatch()
    const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });
    const queryClient = useQueryClient()

    const handleTitleChange = (event) => {
        setNewBlog({ ...newBlog, title: event.target.value });
    };

    const handleAuthorChange = (event) => {
        setNewBlog({ ...newBlog, author: event.target.value });
    };

    const handleUrlChange = (event) => {
        setNewBlog({ ...newBlog, url: event.target.value });
    };

    const newBlogMutation = useMutation({
        mutationFn: blogService.create,
        onSuccess: (newBlog) => {
            queryClient.invalidateQueries(['blogs'])
            //const blogs = queryClient.getQueryData(['blogs'])
            //queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
        },
    })

    const addBlog = (event) => {
        try {
            event.preventDefault();
            newBlogMutation.mutate(newBlog)
            setNewBlog({ title: "", author: "", url: "" });
            notificationDispatch({type: 'SHOW', payload: 'Blog created'})
            ref.current.toggleVisibility();
            setTimeout(() => {
                notificationDispatch({type: 'HIDE'})
            }, 5000);
        } catch (exception) {
            console.log(exception)
            notificationDispatch({type: 'SHOW', payload: 'Failed to create blog'})
            setTimeout(() => {
                notificationDispatch({type: 'HIDE'})
            }, 5000);
        }
    };

    return (
        <>
            <div>
                <label className="block">title</label>
                <input
                    type="text"
                    id="input-title"
                    role="input-title"
                    value={newBlog.title}
                    onChange={handleTitleChange}
                />
            </div>

            <div>
                <label className="block">author</label>
                <input
                    type="text"
                    id="input-author"
                    role="input-author"
                    value={newBlog.author}
                    onChange={handleAuthorChange}
                />
            </div>

            <div>
                <label className="block">url</label>
                <input type="text" id="input-url" role="input-url" value={newBlog.url} onChange={handleUrlChange} />
            </div>

            <button id="create-button" onClick={addBlog} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-4 rounded my-2 mr-1">
                create
            </button>
        </>
    );
})

export default BlogForm;
