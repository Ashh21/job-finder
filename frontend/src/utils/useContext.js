import { createContext, useState } from "react";

const StateContext = createContext()

const StateProvider = ({ children }) => {
    const [editing, setEditing] = useState(false);
    const [editId, setEditId] = useState('');

    return (
        <StateContext.Provider value={{ editing, setEditing, editId, setEditId }}>
            {children}
        </StateContext.Provider>
    )
}


export { StateContext, StateProvider }