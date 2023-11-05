import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

const App = () => {
    const queryClient = useQueryClient()
    const voteMutation = useMutation({
        mutationFn: anecdote => axios.put('http://localhost:3001/anecdotes/' + anecdote.id, anecdote).then(res => res.data),
        onSuccess: anecdote => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.map(existing => anecdote.id === existing.id ? anecdote : existing))
        }
    })

    const handleVote = (anecdote) => {
        voteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    }

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: () => axios.get('http://localhost:3001/anecdotes').then(res => res.data),
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
