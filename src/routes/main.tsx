
import { IRoute } from '../interfaes/routes'  
import { MainPage } from '../pages/MainPage'
import { ProfilePage } from "../pages/ProfilePage";
import { CompletePage } from '../pages/CompletePage'
export const mainRoute: IRoute[] = [
  {
    path: '/',
    element: MainPage, 
    auth: false
  },
  {
    path: '/profile/:uid',
    element: ProfilePage,
    auth: false
  },
  {
    path: '/profile/',
    element: ProfilePage,
    auth: false
  },
  {
    path: '/complete',
    element: CompletePage,
    auth: true
  }
]
