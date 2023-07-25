// This component is used to create a context for the authentication of the user.
// It is used to store the authentication state of the user and to provide the authentication state to other components.
"use client";
import {createContext, useContext, useState} from "react";

const authContext = createContext({
    loggedIn: false,
});

export function AuthProvider({children}) {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <authContext.Provider value={{loggedIn, setLoggedIn}}>
            {children}
        </authContext.Provider>
    )
}

export function useAuthContext() {
    return useContext(authContext);
}