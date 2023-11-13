import Notification from "./Notification.jsx";
import * as PropTypes from "prop-types";
import Blog from "./Blog.jsx";
import {useQuery} from "react-query";
import blogService from "../services/blogs.js";

const Blogs = ({blogForm}) => {
    const result = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => await blogService.getAll()
    })

    if (result.isLoading) {
        return <div>loading data...</div>
    }

    const blogs = result.data


    return <>
        <h2>create new</h2>
        <Notification/>
        {blogForm()}

        <div>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    </>;
}

export default Blogs

Blogs.propTypes = {
    blogForm: PropTypes.any,
    blogs: PropTypes.any,
};