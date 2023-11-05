import {useMutation, useQueryClient} from "@tanstack/react-query";
import {newAnecdote} from '../request.js'
import NotificationContext, {useNotificationDispatch} from "../NotificationContext.jsx";

const AnecdoteForm = () => {
    const dispatch = useNotificationDispatch(NotificationContext)
    const queryClient = useQueryClient()
    const newAnecdoteMutation = useMutation({
        mutationFn: newAnecdote,
        onSuccess: anecdote => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.concat(anecdote))
            dispatch({type: "SHOW", payload: `anecdote ${anecdote.content} created`})
            setTimeout(() => dispatch({type: "HIDE"}), 5000)
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
