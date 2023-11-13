import {useQuery} from "react-query";
import userService from '../services/users.js'

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
                            <td>{user.name}</td>
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