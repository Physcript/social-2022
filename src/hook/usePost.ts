
import { useState, useEffect,useCallback } from 'react'
import { useParams } from 'react-router-dom'

export function usePost(uid = '',loading,_limit = 5) {
  
  const [ _post, set_Post ] = useState([])
  const [ count,setCount ] = useState<number>(0)
  const [ limit,set_Limit ] = useState<number>(_limit)
  const url = `http://localhost:1337/api/p/${uid}`
  const method = 'POST'
  
 
  const body = JSON.stringify({ limit: _limit })

  const refresh = useCallback(async () => {
    
    fetch(url, { method,body, headers: {"Content-Type":"application/json"} })
      .then((res) => {
        if(res.status === 200)
          {
            res.json().then((val) => {
              set_Post(val.message.post)
              setCount(val.message.count)
            })
          }
      })


  })


  useEffect(() => {
    refresh() 
  },[loading,_limit])
  return { _post,count }
}

