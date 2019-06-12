import React from 'react'

export interface AuthContextInterface {
    token: string,
    userId: string,
    login(token: string, userId: string, tokenExpiration: number): void,
    logout(): void,
}

const defaultValue = {
    token: "",
    userId: "",
    login: () => {},
    logout: () => {}
}
  
export const AppContext = React.createContext<AuthContextInterface>(defaultValue);

export const ContextProvider = AppContext.Provider
export const ContextConsumer = AppContext.Consumer