import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

const AnecdoteForm = () => {
    const queryClient = useQueryClient()
    const newAnecdoteMutation = useMutation({
        mutationFn: anecdote => axios.post('http://localhost:3001/anecdotes', anecdote).then(res => res.data),
        onSuccess: (anecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.concat(anecdote))
        }
    })

    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        console.log('new anecdote')
        newAnecdoteMutation.mutate({content, votes: 0})
    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name='anecdote'/>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
