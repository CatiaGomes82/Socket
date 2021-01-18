import React, { createContext, useReducer } from 'react';
import userReducer from './reducers/globalReducer';

const globalState = {
    user: {}
};

export const GlobalContext = createContext(globalState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, globalState);

    return (
        <GlobalContext.Provider value={{ globalState, dispatch }}>
            {children}
        </GlobalContext.Provider>
    )
}