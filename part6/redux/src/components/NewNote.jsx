import {useDispatch} from "react-redux";
import {createNote} from "../reducers/noteReducer";
import noteService from '../services/notes.js'

const NewNote = () => {
    const dispatch = useDispatch()

    const addNode = async (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ''
        const newNote = await noteService.createNew(content)
        dispatch(createNote(newNote))
    }

    return (
        <form onSubmit={addNode}>
            <input name="note"/>
            <button type="submit">add</button>
        </form>
    )
}

export default NewNote