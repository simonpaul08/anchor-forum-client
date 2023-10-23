import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

const AuthContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);

    let value = {
        currentUser, setCurrentUser
    }

    useEffect(() => {
        let user = JSON.parse(window.localStorage.getItem('user'));
        if(user){
            setCurrentUser(user);
        }
    }, [])

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;