// This component is used to create a context for the authentication of the user.
// It is used to store the authentication state of the user and to provide the authentication state to other components.
"use client";
import {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext({
    loggedIn: false,
});

export function AuthProvider({children}) {
    const [loggedIn, setLoggedIn] = useState(false);

    // Function to check token asynchronously
    const checkToken = async () => {
        const storedToken = sessionStorage.getItem('token');
        return !!storedToken; // If token exists, return true, else false
    };

    useEffect(() => {
        const fetchToken = async () => {
            const tokenIsValid = await checkToken();
            setLoggedIn(tokenIsValid);
        };
        fetchToken();
    }, []);

    return (
        <AuthContext.Provider value={{loggedIn, checkToken, setLoggedIn}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    return useContext(AuthContext);
}