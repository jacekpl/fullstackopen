import {useDispatch, useSelector} from "react-redux";
import {voteOn} from "../reducers/anecdoteReducer.js";

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter === 'ALL') {
            return state.anecdotes
        }

        return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
    })
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteOn(id))
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
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList