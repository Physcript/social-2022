import React, { useState } from 'react'
import { Container } from 'react-bootstrap'


interface IRegister {
  email: string,
  password: string
}

export function RegisterPage() {
  
  const [ userInput, setUserInput ] = useState<IRegister>({
    email: '',
    password: ''
  })

  const [ error,setError ] = useState({})
  const [ loading,setLoading ] = useState<boolean>(false)
  const [ register,setRegister ] = useState<boolean>(false) 
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { name,value } = e.target
    setUserInput((val) => ({
      ...val,
      [name]: value
    }))
  }

  const registerHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
    const url = 'http://localhost:1337/api/u/create'
    const method = 'post'
    const body = JSON.stringify(userInput)

    const _request = new Request(url,{
      method,
      headers: { "Content-Type": "application/json" },
      body
    })

    fetch(_request)
      .then((val) => {
        if(val.status === 200)
          {
            val.json().then((res) => {
              setError({})
              setRegister(true)
            })
          }
        else
          {
            val.json().then((res) => {
              setError(res.error)
            })
          }
      })
      .catch((err) => {

      })
      .finally(() => {

      })

  }  


  if(register)
    {
      window.setTimeout(() => {
        window.location.href = "http://localhost:5173/"
      },10000) 
      return (
        <>
          <Container>
            <div className="d-flex jc ai ac f-column gap-2" style={{ height:'90vh' }}>
              <img src='https://res.cloudinary.com/dnnq8kne2/image/upload/v1659857147/social-2022/ok1luvqnzltvq5btelbf.png' width="150"/>
              <h2>ACCOUNT CREATED</h2>
              <p>Complete your account information once you logged in</p>
              <p>Redirect in 10sec...</p>
            </div>
          </Container>
        </>
      )
    }
  return (
    <>
      <Container>
        <div className='d-flex f-column'>
          { Object.keys(error).length >= 1 ? 
            (
              Object.values(error).map((value) => {
                return (
                  <label className="error-text">{value}</label>
                )
              })
            )
            :
            (
              ''
            )
          }
          <label>Register</label>
          <section className="d-flex f-column gap-2">
            <input name="email" value={userInput.email} onChange={onChange} type="text" placeholder="Email" />
            <input name="password" value={userInput.password} onChange={onChange} type="password" placeholder="Password" />
            <button onClick={registerHandler} className="w-50">Register</button>
          </section>
        </div>
      </Container>
    </>
  )
}
