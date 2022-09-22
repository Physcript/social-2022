
import React, { useEffect,useState,useContext } from 'react'
import { AuthContext } from '../context/auth/context'
import { useCheckFollow } from '../hook/useCheckFollow'

export function ProfileLeft( _user: any ) {
  
  const [ user,setUser ] = useState(_user.user) 
  const [ loading,setLoading ] = useState<boolean>(false)
  const [ toRefresh,setToRefresh ] = useState(false)
  const [ _followed, set_Followed ] = useState<boolean>(false)
  const [ _count, set_Count ] = useState<number>(0)


  const userContext = useContext(AuthContext) 

  const { data,count } = useCheckFollow(user.uid ?? '', toRefresh)  

  useEffect(() => {
    setUser(_user.user)
    set_Followed(data)
    set_Count(count) 
  },[_user,data])
  

  const followHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if(loading) return

    setLoading(true)
    setToRefresh(true)

    const url = `http://localhost:1337/api/f/create`
    const method = "POST"
    const body = JSON.stringify({ toFollow: user.uid })

    const _request = new Request(url, {
      method,
      headers: { 'Content-Type':'application/json', token: localStorage.getItem('token') ?? '' },
      body
    })
    
    setLoading(true)

    fetch(_request)
      .then((val) => {
        if(val.status === 200){
          setLoading(false)
        }
        else {
          setLoading(false)
        }
      })
      .finally(() => {
        setLoading(false)
        setToRefresh(false)
      })


  }

  return (
    <section className="left-col d-flex f-column">
      <img src={user.avatar ?? ''} width="200" height="200"/>
      <label>{ user.firstName } { user.lastName } </label>
      { userContext.userState.USER.uid === user.uid ? ( '' ) : (
         
          <button onClick = {followHandler} disabled = { loading }>{ _followed ? ('unfollow') : 'Follow'}</button>
       
        )
      }
      <label>Followers: { _count }</label> 
      <label>Message</label>
    </section>
  )
}
