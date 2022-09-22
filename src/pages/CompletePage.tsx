import React , { useState,useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import {AuthContext} from '../context/auth/context'

export function CompletePage() {

  const [ userInput,setUserInput ] = useState({
    firstName: '',
    lastName: '',
    address: '',
    public_id: '',
    url: ''
  })

  const userContext = useContext(AuthContext)
  const navigate = useNavigate()
  const [ file,setFile ] = useState()
  const [ imagePreview,setImagePreview ] = useState()
  const [ error,setError ] = useState('')

  const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    previewImage(e.target.files[0])
    setFile(e.target.files[0])
  }

  const previewImage = (file: any) => {

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setImagePreview((val) => reader.result)
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { name, value } = e.target
    setUserInput((val) => ({
      ...val,
      [name]: value
    }))
  }

  const completeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
    if(userInput.firstName == '' || userInput.lastName == '' || userInput.address == '' || imagePreview == null)
      {
        setError('Fill up all required form')
        return
      }
    
    setError(null)
    const url="http://localhost:1337/api/u/complete"
    const method="POST"

    const formData = new FormData()
    formData.append('img', file)

    const _req = new Request(url, {
      method,
      headers: {'token':localStorage.getItem('token')},
      body: formData
    })


    fetch(_req)
      .then((val) => {
        if(val.status === 200) 
          {
            val.json().then((res) => {
              const { public_id,url } = res.message
              const newData = userInput
              newData.public_id = public_id
              newData.url = url

              const _body = JSON.stringify(newData)
              const _url = 'http://localhost:1337/api/u/complete_update'
              const _method = 'POST'  

              const __req = new Request(_url, {
                method: _method, 
                headers: { 'Content-Type': 'application/json', token : localStorage.getItem('token') ?? '' },
                body: _body
              })


              fetch(__req)
                .then((val) => {
                  if(val.status === 200) 
                    {
                      val.json().then((res) => {
                        window.location.assign('http://localhost:5173')  
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
  
  if(userContext.userState.COMPLETION === true) {
    window.location.assign('http://localhost:5173')
  }

  return (
    <>
      <Container>

        <div className='d-flex f-column'>

          {
            error ? (
              <div>
                <label className="error-text">{ error }</label>
              </div>
            ) : ('')
          }

          <label>Complete your profile</label>
          <input name="firstName" value={userInput.firstName} onChange={onChange} placeholder="Firstname" />
          <input name="lastName" value={userInput.lastName} onChange={onChange} placeholder="Lastname" />
          <input name="address" value={userInput.address} onChange={onChange} placeholder="Address" />
          <section className="d-flex f-column">
            <label>Avatar</label>
            <input type="file" accept="image/*" onChange={fileHandler}/>
            <img src={imagePreview} width="150" height="150" />
          </section>
          <button onClick={completeHandler} className="w-50">Save</button>
        </div>

      </Container>
    </>
  )
}
