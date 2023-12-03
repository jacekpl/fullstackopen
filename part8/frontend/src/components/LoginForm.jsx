import {useEffect, useState} from "react";
import {useMutation} from "@apollo/client";
import {LOGIN} from "../queries.js";

const LoginForm = ({setToken}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if ( result.data ) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('user-token', token)
        }
    }, [result.data])

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(login, password)
        login({ variables: { username, password } })
    }

    return (
        <form onSubmit={handleSubmit}>
            login:
            <input type="text" name="username" onChange={(event) => setUsername(event.target.value)} value={username}/>
            <br/>password:
            <input type="password" name="password" onChange={(event) => setPassword(event.target.value)} value={password}/>
            <br/>
            <button>login</button>
        </form>
    )
}

export default LoginForm