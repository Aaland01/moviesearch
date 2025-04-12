import { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginWrapper = ({children}) => {
    const [showLogin, setShowLogin] = useState(false);

    const toggleLogin = () => setShowLogin(prev => !prev);

    return (
        <LoginContext.Provider value={{ showLogin, toggleLogin}}>
            {children}
        </LoginContext.Provider>
    )
}
