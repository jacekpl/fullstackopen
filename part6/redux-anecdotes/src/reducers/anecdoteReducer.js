import {createSlice} from "@reduxjs/toolkit";
import anecdotesService from '../services/anecdotes.js'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        voteOn(state, action) {
            const id = action.payload
            const anecdoteToChange = state.find(n => n.id === id)
            const changedAnecdote = {
                ...anecdoteToChange,
                votes: anecdoteToChange.votes + 1
            }
            return state.map(anecdote =>
                anecdote.id !== id ? anecdote : changedAnecdote
            ).sort((a, b) => b.votes - a.votes)
        },
        setAnecdotes(state, action) {
            return action.payload.sort((a, b) => b.votes - a.votes)
        },
        appendAnecdote(state, action) {
            state.push(action.payload)
        }
    }
})

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdotesService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdotesService.createNew(content)
        dispatch(appendAnecdote(newAnecdote))
    }
}

export const voteOnAnecdote = (id) => {
    return async dispatch => {
        const updatedAnecdote = await anecdotesService.vote(id)
        dispatch(voteOn(id))
    }
}


export const {voteOn, setAnecdotes, appendAnecdote} = anecdoteSlice.actions
export default anecdoteSlice.reducer