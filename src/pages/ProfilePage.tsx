

import React , { useContext,useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { AuthContext } from '../context/auth/context'
import { usePost } from '../hook/usePost'
import { IUser, DUser } from '../interfaces/user' 


import { CommentComp } from '../components/CommentComp'
import { ProfileLeft } from '../components/ProfileLeft'

export function ProfilePage() {

  const { uid } = useParams()
  const userContext = useContext(AuthContext)
  
  const [ user,setUser ] = useState<IUser>(DUser)
  const [ limit,setLimit ] = useState<number>(5)
  const [ cLimit, setCLimit ] = useState<number>(5)

  const [ userInput,setUserInput ] = useState<string>({
    post: '',
    comment: ''
  })

  const [ loading,setLoading ] = useState<boolean>(false)

  const { _post,count } = usePost(uid,loading,limit)

  const [ myPost, setMyPost ] = useState()
  const [ _count, set_Count ] = useState<number>()

  useEffect(() => {
    setMyPost(_post)
    set_Count(count)
  },[_post,count]) 
  useEffect(() => {

    if(uid === null || uid === '' || uid === undefined)
      {
        setUser(userContext.userState.USER)
        console.log('null')
      } 

    else
      {
        console.log('not null')
        // find by using uid
        let url = `http://localhost:1337/api/u/${uid}`
        let method = 'POST'
        
        const _req = new Request(url, {
          method, 
        })
        fetch(_req)
          .then((val) => {
            if(val.status === 200) 
              {
                val.json().then((res) => {
                  console.log(res)
                  setUser(res.message.user)
                })
              }
          })
          .catch((err) => {

          })
          .finally(() => {

          })

      }

  },[userContext,uid])

   

  const onChange = (e: React.ChangeEvent<HTMLTextarea>) => {
    e.preventDefault()
    const { name,value } = e.target
    setUserInput((val) => ({
      ...val,
      [name]: value
    }))
  }
  
  const postHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(userInput)
    // post // name //fromUid //toUid
    const _body = {
      post: userInput.post ?? '',
      name: user.lastName + ' ' + user.firstName,
      fromUid: userContext.userState.USER.uid,
      toUid: user.uid
    }
    const body = JSON.stringify(_body) 
    const url = 'http://localhost:1337/api/p/create'
    const method = 'POST'
    const req = new Request(url, {  

      method,
      headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') ?? '' },
      body

    })


    fetch(req)
      .then((val) => {
        if(val.status === 200) 
          {
            val.json().then((res) => {
              setUserInput((val) => ({
                ...val,
                post: ''
              }))
              setLoading(true)
            }) 
          }
      })
      .catch((err) => {

      })
      .finally(() => {
        setLoading(false)      
      })
      

  }

  const seeMoreHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLimit(limit+cLimit)
  }

  return (
    <>
      <Container>
        <div className="profile-page d-flex gap-3">
          
          <ProfileLeft user = { user } />
          <section className="right-col w-100">
          { user.uid === userContext.userState.USER.uid ?
            ( <div>
              <textarea value={ userInput.post }name='post' onChange={onChange} rows="5" className="w-100" style={{ resize: 'none',padding: '10px' }} placeholder="Text here..."/>
              <button onClick={postHandler} style = {{ padding: '0 20px' }}>Post</button>
              </div>
            ): 
              (
                <div>
                  <textarea value={ userInput.post }name='post' onChange={onChange} rows="5" className="w-100" style={{ resize: 'none',padding: '10px' }} placeholder={'Post to ' + user.firstName + ' ' + user.lastName}/>
                  <button onClick={postHandler} style = {{ padding: '0 20px' }}>Post</button>
                </div>
              )
          }
          <div>
              {
                myPost ? ( 
                  myPost.map((p,index) => {
                    return (
                      <CommentComp comment={p} key={p._id}/> 
                    )
                  })
                ) : (<div>No post</div>)
              }

              {
                _count >= 5  && limit < _count ? ( 
                <section>
                  <button
                    style = {{ background: 'none', border: 'none' }}
                    onClick = { seeMoreHandler }
                  >See more post</button>
                </section> ): ( <section>No more post</section> )
              }
          </div>
        </section>
        </div>
      </Container>
    </>
  )
}





