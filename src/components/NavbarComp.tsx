
import { useState,useContext,useEffect } from 'react'
import { AuthContext } from '../context/auth/context'

import { Container,Navbar,Nav } from 'react-bootstrap'
import { login } from '../module/login'
import { NavLink,useNavigate } from 'react-router-dom'

export function NavbarComp() {
  
  const navigate = useNavigate()
  const userContext = useContext(AuthContext)
  
    if(!userContext.userState.STATUS)
      {
        let currentToken = localStorage.getItem('token')
        if( currentToken == undefined || currentToken === '')
          {
            console.log('no token')
          }
        else 
          {
            const url = 'http://localhost:1337/api/a/auth'
            const method = 'GET'
            const _request = new Request(url, {
              method,
              headers: { "Content-Type": "application/json", token: currentToken }, 
            })
  

            fetch(_request)
              .then((val) => {
                if(val.status === 200)
                  {
                    val.json().then((res) => {
                      const { USER,COMPLETION } = res.message
                      userContext.userDispatch({ TYPE: 'LOGIN', PAYLOAD: { USER,COMPLETION,TOKEN: currentToken } })
                    })
                  }
                else 
                  {
                    val.json().then((res) => {
                    console.log(res)
                    })
                  }
              })
              .catch((err) => {
                console.log(err)
              })
              .finally(() => {

              })
          }
      }
    else
      {

      }


  const logoutHanlder = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const url = 'http://localhost:1337/api/u/logout'
    const method = 'POST'
    const _req = new Request(url, {
      method,
      headers: { 'Content-type': 'application/json', token : localStorage.getItem('token')  }
    })

    fetch(_req)
      .then((val)=> {
        if(val.status === 200)
          {
          val.json().then((res) => {
            localStorage.setItem('token', '')
            window.location.assign('/')
          })
        }
        else
          {
          
          }
      })
      .catch((err) => {

      })
      .finally(() => {

      })

  }


  return (
    <Navbar>
      <Container>
        <section>
          <label onClick ={ () => navigate('/') }>Logo</label>
        </section>
        {
          userContext.userState.STATUS ? 
          (
           <Nav>
              <Nav.Link onClick= { () => navigate(`/profile/${userContext.userState.USER.uid}`) } > { userContext.userState.USER.lastName }</Nav.Link> 
              <Nav.Link as={NavLink} to="/" onClick={logoutHanlder}>Logout</Nav.Link> 
           </Nav>
          ):
          (
            <Nav>
              <Nav.Link as={NavLink} to="/register">Register</Nav.Link> 
              <Nav.Link as={NavLink} to="/login">Login</Nav.Link> 
            </Nav>
          )
        }
      </Container>
    </Navbar>
  )
}
