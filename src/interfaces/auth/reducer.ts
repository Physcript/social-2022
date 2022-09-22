



export interface IReducer {
  TYPE: 'LOGIN' | 'LOGOUT' | 'AUTH',
  PAYLOAD: {
    USER?: IUser,
    TOKEN?: string,
    COMPLETION: boolean
  }
}
