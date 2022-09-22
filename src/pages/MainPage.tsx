
import React,{useState,useEffect,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {AuthContext} from '../context/auth/context'   

export function MainPage() {
  const userContext = useContext(AuthContext)
  const navigate = useNavigate()
  
  if(userContext.userState.STATUS === true && userContext.userState.COMPLETION === false)
    {
      navigate('/complete')
    }
  return (
    <div>
      Main page
    </div>
  )
}
