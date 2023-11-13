import {useQuery} from "react-query";
import userService from '../services/users.js'
import {Link} from "react-router-dom";

const Users = () => {
    const result = useQuery({
        queryKey: ['users'],
        queryFn: () => userService.getAll()
    })

    if (result.isLoading) {
        return <div>loading data...</div>
    }

    return (
        <div>
            users
            <table>
                <thead>
                <tr>
                    <td></td>
                    <td><b>blogs created</b></td>
                </tr>
                </thead>
                <tbody>
                {result.data.map(function(user) {
                    return (
                        <tr key={user.id}>
                            <td><Link to={"/users/" + user.id}>{user.name}</Link></td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default Users