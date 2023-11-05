import axios from "axios";

export const newAnecdote = anecdote => axios.post('http://localhost:3001/anecdotes', anecdote).then(res => res.data)

export const updateAnecdote = anecdote => axios.put('http://localhost:3001/anecdotes/' + anecdote.id, anecdote).then(res => res.data)

export const getAll = () => axios.get('http://localhost:3001/anecdotes').then(res => res.data)