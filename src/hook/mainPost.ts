

import React, { useState,useEffect,useCallback } from 'react'

export function mainPost (uid = '', loading, _limit=5) {
  
  const [ post, setPost ] = useState([])
  const [ loading,setLoading ] = useState(false)
  const [ error,setError ] = useState<any>()
  const [ limit, setLimit= 5 ] = useState<number>(_limit)
  

  const refresh = () => {
    const url = 'http://localhost:1337/api/p/main'
    const method = 'POST'
    
    const _request = new Request(url, {
      method,
      headers: { "Content-Type": 'application/json', "token": localStorage.getItem('token') },
    }) 
    
    .fetch(_request)
      .then((res) => {
        if(res.status === 200) 
          {
            res.json().then((val) => {
              setPost(val.message.post)
            })
          }
      })
    
  }

  useEffect(() => {
    
    refresh()

  },[])
  
  return { post }

}
