import { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginWrapper = ({children}) => {
    const [showLogin, setShowLogin] = useState(false);
    const [message, setMessage] = useState("");

    const toggleLogin = () => {
        setShowLogin(prev => !prev);
    }

    return (
        <LoginContext.Provider value={{ showLogin, toggleLogin, message, setMessage}}>
            {children}
        </LoginContext.Provider>
    )
}
