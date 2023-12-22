import { createContext, useState } from "react";

const StateContext = createContext()

const StateProvider = ({ children }) => {
    const [signIn, setSignIn] = useState(false)
    const [editing, setEditing] = useState(false);
    const [editId, setEditId] = useState('');

    return (
        <StateContext.Provider value={{ signIn, setSignIn, editing, setEditing, editId, setEditId }}>
            {children}
        </StateContext.Provider>
    )
}


export { StateContext, StateProvider }