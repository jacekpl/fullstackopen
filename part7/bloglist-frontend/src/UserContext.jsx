import {createContext, useContext, useReducer} from "react";

const userReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.payload
        case 'LOGOUT':
            return null
        default:
            return state
    }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
    const [user, userDispatch] = useReducer(userReducer, null)

    return (
        <UserContext.Provider value={[user, userDispatch]}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const userAndDispatcher = useContext(UserContext)
    return userAndDispatcher[0]
}

export const useUserDispatcher = () => {
    const userAndDispatcher = useContext(UserContext)
    return userAndDispatcher[1]
}

export default UserContext