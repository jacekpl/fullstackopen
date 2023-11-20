import Notification from "./Notification.jsx";
import * as PropTypes from "prop-types";
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

    return <>
        <Notification/>
        {blogForm()}

        <div>
            {blogs.map((blog) => (
                <div key={blog.id} className="flex items-center rounded-md p-1.5 bg-gray-200 text-black my-1">
                    <Link to={'blogs/' + blog.id} className="no-underline hover:underline text-blue-900">{blog.title}</Link>
                </div>
            ))}
        </div>
    </>;
}

export default Blogs

Blogs.propTypes = {
    blogForm: PropTypes.any,
    blogs: PropTypes.any,
};