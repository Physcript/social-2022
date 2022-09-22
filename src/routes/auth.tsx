
import { IRoute } from '../interfaces/routes' 
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'

export const authRoute: IRoute[] = [
  {
    path: '/login',
    element: LoginPage,
    auth: false
  },
  {
    path: '/register',
    element: RegisterPage,
    auth: false
  }
]
