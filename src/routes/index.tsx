
import { mainRoute } from './main'
import { authRoute } from './auth'

export const route: IRoute[] = [
  ...mainRoute,
  ...authRoute
] 


