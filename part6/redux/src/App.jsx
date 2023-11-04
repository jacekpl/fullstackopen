import NewNote from "./components/NewNote.jsx";
import Notes from "./components/Notes.jsx";
import VisibilityFilter from "./components/VisibilityFilter.jsx";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import noteService from './services/notes.js'
import {setNotes} from "./reducers/noteReducer.js";

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        noteService.getAll().then(notes => dispatch(setNotes(notes)))
    }, []);

    return (<div>
        <NewNote/>
        <VisibilityFilter/>
        <Notes/>
    </div>)
}

export default App