import {useDispatch, useSelector} from "react-redux";
import {voteOnAnecdote} from "../reducers/anecdoteReducer.js";
import {removeMessage, setMessage, setNotification} from "../reducers/notificationReducer.js";

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter === '') {
            return state.anecdotes
        }

        return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
    })

    const dispatch = useDispatch()

    const vote = (id, name) => {
        dispatch(voteOnAnecdote(id))
        dispatch(setNotification('you voted on ' + name, 10))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList