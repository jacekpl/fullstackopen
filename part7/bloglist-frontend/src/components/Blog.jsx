import {useMutation, useQuery, useQueryClient} from "react-query";
import blogService from "../services/blogs.js";
import {useNotificationDispatch} from "../NotificationContext.jsx";
import {useUser} from "../UserContext.jsx";
import {useParams} from "react-router-dom";
import Comments from "./Comments.jsx";

const Blog = () => {
    const blogId = useParams().id
    const result = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => await blogService.getAll()
    })

    const user = useUser()
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
            queryClient.invalidateQueries({queryKey: ['blogs']})
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
            await removeBlogMutation.mutate(id)
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
    }

    if (result.isLoading) {
        return <div>loading data...</div>
    }

    const blog = result.data.find(b => b.id === blogId)

    return (
        <div className="blog">
            <h1 className="title font-bold">{blog.title}</h1> <span className="author">{blog.author}</span>
            <div>
                <div className="url"><a href={blog.url} className="no-underline hover:underline text-blue-500">{blog.url}</a></div>
                <div className="likes">
                    likes {blog.likes ?? 0}
                    <button onClick={handleLike} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-4 rounded my-2 ml-1">like</button>
                </div>
                <div className="user">{blog.user?.name ?? "missing-name"}</div>
                {blog.user.username === user.username && <button onClick={handleRemove} className="bg-red-500 hover:bg-red-700 text-white font-bold py-0 px-4 rounded my-2">remove</button>}
            </div>

            <Comments blogId={blog.id} comments={blog.comments}/>
        </div>
    );
};

export default Blog;
