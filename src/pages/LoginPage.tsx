
import React,{ useState,useContext } from 'react'
import { AuthContext } from '../context/auth/context'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

interface IUserInput {
  email: string,
  password: string
}


export function LoginPage() {
  const navigate = useNavigate()
  const userContext = useContext(AuthContext)
  const [ loading,setLoading ] = useState<boolean>(false)
  const [ userInput,setUserInput ] = useState<IUserInput>({
    email: '',
    password: ''
  })
  const [ error,setError ] = useState('')
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name,value } = e.target 
    setUserInput((val) => ({
      ...val,
      [name]: value
    }))
  }

  const loginHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoading(true)

    const url = 'http://localhost:1337/api/u/login'
    const method = 'POST'
    const body = JSON.stringify(userInput)

    const _req = new Request(url, {
      body,
      method,
      headers: { "Content-Type": "application/json" },

    })

    fetch(_req)
      .then((val) => {
        if(val.status === 200)
          {
            val.json().then((res) => {
              const { token: TOKEN, user: USER, userCompletion: COMPLETION } = res.message
              setError('')
              userContext.userDispatch({TYPE:'LOGIN', PAYLOAD: { TOKEN,USER,COMPLETION }})
              navigate('/')
              window.location.reload()
            })
          }
        else
          {
            val.json().then((res) => {
              setError(res.error)
              setLoading(false)
            })
          }
      })
      .catch((error) => {
        setLoading(false)
      })
      .finally(() => {
        setLoading(false)
      })

  }


  return (
    <>
      <Container>
        <section className="d-flex f-column jc as" style={{ height: '90vh' }}>
          <div className="d-flex f-column gap-2 w-50 mx-auto">
            { error ? ( <label>{error}</label> ) : ('') }
            <label>Login</label>
            <input name="email" onChange={onChange} value={userInput.email} placeholder="Email" />
            <input name="password" onChange={onChange} value={userInput.password} type="password" placeholder="Password" />
            <a href="#">Forgot password</a>
            <button disabled={ loading }onClick={loginHandler} style={{width:'50%'}}>Login</button>
          </div>
        </section>
      </Container>
    </>
  )
}
