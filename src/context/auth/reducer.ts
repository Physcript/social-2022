
import { IUser, DUser } from '../../interfaces/user'
import { IUserContext } from '../../interfaces/auth/context'
import { IReducer } from '../../interface/auth/reducer'

// state = USER,TOKEN,STATUS,COMPLETION 
// action = TYPE PAYLOAD USER TOKEN COMPLETION 

export function reducer (state: IUserContext,action: IReducer): IUserContext {
  const USER = action.PAYLOAD.USER ?? DUser
  const TOKEN = action.PAYLOAD.TOKEN ?? ''
  const COMPLETION = action.PAYLOAD.COMPLETION ?? false

  switch(action.TYPE) {

    case 'LOGIN':
      localStorage.setItem('token', TOKEN)

      return {
        USER,
        TOKEN,
        STATUS: true,
        COMPLETION
      }
    default: 
      return state
  }

}
