import {createSlice} from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setMessage(state, action) {
            return action.payload
        },
        removeMessage(state, action) {
            return  ''
        }
    }
})

export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch(setMessage(message))
        setTimeout(function () {
            dispatch(removeMessage())
        }, time * 1000)
    }
}


export const {setMessage, removeMessage} = notificationSlice.actions

export default notificationSlice.reducer