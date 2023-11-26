import { useState } from 'react'
import {useMutation} from "@apollo/client";
import {ADD_BOOK, ALL_AUTHORS, ALL_BOOKS, UPDATE_BIRTH_DATE} from "../queries.js";

const SetBirthYear = ({authors}) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')
    const [updateBirthDate] = useMutation(UPDATE_BIRTH_DATE, {
        refetchQueries: [{query: ALL_BOOKS}, {query: ALL_AUTHORS}]
    })

    const submit = async (event) => {
        event.preventDefault()
        await updateBirthDate({variables: {name, born: parseInt(born)}})
        setBorn('')
    }

    return (
        <div>
            <h2>set birthyear</h2>
            <form onSubmit={submit}>
                <div>
                    name
                    <select onChange={({target}) => setName(target.value)}>
                        {authors.map(author => <option key={author.name} value={author.name}>{author.name}</option>)}
                    </select>
                </div>
                <div>
                    born
                    <input
                        type="number"
                        value={born}
                        onChange={({ target }) => setBorn(target.value)}
                    />
                </div>
                <button type="submit">update</button>
            </form>
        </div>
    )
}

export default SetBirthYear