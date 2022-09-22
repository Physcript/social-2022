
import React, { useEffect,useState,useCallback } from 'react'


export function useCheckFollow(_toFollow: string, _refresh: any) {
  
  const [ data,setData ] = useState<boolean>(false)
  const [ count, setCount ] = useState<number>(0)
  const url = 'http://localhost:1337/api/f/check'
  const method = 'POST' 
  const body = JSON.stringify({
    toFollow: _toFollow
  })

  const refresh = useCallback(() => {
    console.log('refresH')    
    fetch(url, { method,body,headers: {"Content-Type": "application/json", token: localStorage.getItem('token') ?? ''} })
    .then((val) => {
      if(val.status === 200){
        val.json()
          .then((res) => {
              setData(res.message.result)
              setCount(res.message.count)
            })
      }
      else{
      }
    })
  })
  


  useEffect(() => {
    refresh()
  },[_toFollow,_refresh])

  return { data,count }

}
