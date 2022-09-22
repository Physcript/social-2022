
import React , { createContext } from 'react'
import { IAuthContext,DUserContext } from '../../interfaces/auth/context'

export const AuthContext = createContext<IAuthContext>({
  userState: DUserContext,
  userDispatch: () => {}
})

export const AuthContextProvider = AuthContext.Provider
export const AuthContextConsumer = AuthContext.Consumer
