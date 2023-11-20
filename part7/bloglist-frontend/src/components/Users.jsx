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
            <h2 className="text-bold">Users</h2>
            <table className="border-collapse table-auto w-full text-sm ">
                <thead>
                <tr className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                    <td></td>
                    <td>blogs created</td>
                </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800">
                {result.data.map(function (user) {
                    return (
                        <tr key={user.id}>
                            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"><Link
                                to={"/users/" + user.id}>{user.name}</Link></td>
                            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{user.blogs.length}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default Users