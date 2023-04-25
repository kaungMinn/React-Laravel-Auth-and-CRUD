import React, { createContext, useContext, useState } from 'react'

const stateContext = createContext({
    user: {},
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
});




const ContextProvider = ({children}) => {

    const [user, setUser] = useState({});
    const [notification, _setNotification] = useState(null);

    const setNotification = (message) => {
        _setNotification(message);

    }

    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    const setToken = (token) => {
        _setToken(token);
        if(token){
            localStorage.setItem('ACCESS_TOKEN',token);
        }else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

  return (
    <stateContext.Provider value={{
        user,
        token,
        notification,
        setUser,
        setToken,
        setNotification,
     }} >
        {children}
    </stateContext.Provider>
  )
}

export default ContextProvider;
export const useStateContext = () => useContext(stateContext);
