import {useDispatch, useSelector} from "react-redux";
import {voteOnAnecdote} from "../reducers/anecdoteReducer.js";
import {removeMessage, setMessage} from "../reducers/notificationReducer.js";

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter === '') {
            return state.anecdotes
        }

        return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
    })

    const dispatch = useDispatch()

    const vote = id => {
        dispatch(voteOnAnecdote(id))
        dispatch(setMessage('you voted on ' + name))
        setTimeout(function () {
            dispatch(removeMessage())
        }, 5000)
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
                        <button onClick={() => vote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList