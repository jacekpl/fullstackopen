import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getAll, updateAnecdote} from "./request.js";
import {useContext} from "react";
import NotificationContext from "./NotificationContext.jsx";

const App = () => {
    const [notification, dispatch] = useContext(NotificationContext)
    const queryClient = useQueryClient()
    const voteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: anecdote => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.map(existing => anecdote.id === existing.id ? anecdote : existing))
            dispatch({type: "SHOW", payload: `anecdote ${anecdote.content} voted on`})
            setTimeout(() => dispatch({type: "HIDE"}), 5000)
        }
    })

    const handleVote = (anecdote) => {
        voteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    }

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: () => getAll(),
        retry: false
    })

    if (result.isLoading) {
        return <div>loading data...</div>
    }

    if (result.isError) {
        return <div>anecdote service not available due to problems in server</div>
    }

    const anecdotes = result.data

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification/>
            <AnecdoteForm/>

            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
