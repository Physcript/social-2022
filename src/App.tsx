
import { AuthContextProvider } from './context/auth/context'
import { useState, useReducer } from 'react'
import { route } from './routes/index'
import { Routes,Route } from 'react-router-dom'
import { reducer } from './context/auth/reducer'
import { DUserContext } from './interfaces/auth/context'

import { NavbarComp } from './components/NavbarComp'

import './App.css'

function App() {
  const [ userState,userDispatch ] = useReducer(reducer,DUserContext)
  const AuthContextValue = { userState,userDispatch }
  return (
    <> 
      <AuthContextProvider value={AuthContextValue}>
      <NavbarComp />
      <Routes>
        {
          route.map((r,i) => {
            return (
              <Route
                key={i}
                path={r.path}
                element={<r.element />}
              />
            )
          })
        }  
      </Routes>
      </AuthContextProvider>
    </>
  )
}

export default App
