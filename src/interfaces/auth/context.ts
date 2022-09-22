

import React from 'react'
import { IUser,DUser } from '../user'
import { IReducer } from './reducer'

export interface IAuthContext {
  userState: IUserContext,
  userDispatch: React.Dispatch<IReducer>
}

export interface IUserContext {
  USER: IUser,
  TOKEN: string,
  STATUS: boolean,
  COMPLETION: boolean
}

export const DUserContext = {
  USER: DUser,
  TOKEN: '',
  STATUS: false,
  COMPLETION: false
}

