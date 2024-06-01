import { useState, createContext, useEffect } from "react";

const UserContext = createContext();

const getInitialUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(getInitialUser());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (currentUser !== null) {
            localStorage.setItem('user', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('user');
        }
    }, [currentUser]);

    const signInStart = () => {
        setLoading(true);
        setError(null);
    };

    const signInSuccess = (user) => {
        setCurrentUser(user);
        setLoading(false);
        setError(null);
    };

    const signInFailure = (err) => {
        setLoading(false);
        setError(err);
    };

    const updateUserStart = () => {
        setLoading(true);
        setError(null);
    };

    const updateUserSuccess = (user) => {
        setCurrentUser(user);
        setLoading(false);
        setError(null);
    };

    const updateUserFailure = (err) => {
        setLoading(false);
        setError(err);
    };

    const deleteUserStart = () => {
        setLoading(true);
        setError(null);
    };

    const deleteUserSuccess = () => {
        setCurrentUser(null);
        setLoading(false);
        setError(null);
    };

    const deleteUserFailure = (err) => {
        setLoading(false);
        setError(err);
    };

    const signOutSuccess = () => {
        setCurrentUser(null);
        setLoading(false);
        setError(null);
    };

    const value = {
        currentUser,
        loading,
        error,
        signInStart,
        signInSuccess,
        signInFailure,
        updateUserStart,
        updateUserSuccess,
        updateUserFailure,
        deleteUserStart,
        deleteUserSuccess,
        deleteUserFailure,
        signOutSuccess,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };
