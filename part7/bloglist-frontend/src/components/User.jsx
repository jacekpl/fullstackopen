import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import userService from "../services/users.js";

const User = () => {
    const id = useParams().id
    const result = useQuery({
        queryKey: ['users', id],
        queryFn: () => userService.getOne(id)
    })

    if (result.isLoading) {
        return <div>loading data...</div>
    }

    const user = result.data

    return (
        <div>
            <h1>{user.name}</h1>
            <h2>Added blogs:</h2>
            <ul>
                {user.blogs.map(function(blog) {
                    return <li key={blog.id}>{blog.title}</li>
                })}
            </ul>
        </div>
    )
}

export default User