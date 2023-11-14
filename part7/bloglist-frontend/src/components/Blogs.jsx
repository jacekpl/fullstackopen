import Notification from "./Notification.jsx";
import * as PropTypes from "prop-types";
import Blog from "./Blog.jsx";
import {useQuery} from "react-query";
import blogService from "../services/blogs.js";
import {Link} from "react-router-dom";

const Blogs = ({blogForm}) => {
    const result = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => await blogService.getAll()
    })

    if (result.isLoading) {
        return <div>loading data...</div>
    }

    const blogs = result.data

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
    };

    return <>
        <h2>create new</h2>
        <Notification/>
        {blogForm()}

        <div>
            {blogs.map((blog) => (
                <div key={blog.id} style={blogStyle}><Link to={'blogs/' + blog.id}>{blog.title}</Link></div>
            ))}
        </div>
    </>;
}

export default Blogs

Blogs.propTypes = {
    blogForm: PropTypes.any,
    blogs: PropTypes.any,
};