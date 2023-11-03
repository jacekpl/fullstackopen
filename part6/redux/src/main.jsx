import React from 'react'
import ReactDOM from 'react-dom/client'
import {createStore, combineReducers} from "redux";
import {Provider} from "react-redux";
import App from "./App.jsx";
import noteReducer, {createNote} from "./reducers/noteReducer";
import filterReducer, {filterChange} from "./reducers/filterReducer";

const reducer = combineReducers({
    notes: noteReducer,
    filter: filterReducer
})

const store = createStore(reducer)
store.subscribe(() => console.log(store.getState()))
store.dispatch(filterChange('IMPORTANT'))
store.dispatch(createNote('combineReducers forms one reducer from many reducers'))

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App/>
    </Provider>
)
