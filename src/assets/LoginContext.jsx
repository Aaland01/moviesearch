import { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginWrapper = ({children}) => {
    const [showLogin, setShowLogin] = useState(false);
    const [message, setMessage] = useState("");

    const toggleLogin = (alert = "") => {
        setShowLogin(prev => !prev);
        if(message){
            alert="";
        }
        setMessage(alert)
    }

    return (
        <LoginContext.Provider value={{ showLogin, toggleLogin}}>
            {children}
        </LoginContext.Provider>
    )
}
