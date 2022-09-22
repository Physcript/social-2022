import React, { useState,useEffect } from 'react'
import { IComment } from '../interfaces/comment'

export function CommentComp (c: IComment) {

  const  [ comment,setComment ] = useState(c.comment)

  return (
    <div style = {{ padding: '10px' }}>
      <section>{comment.name}</section>
      <section style={{paddingLeft: '10px'}}>{ comment.body }</section>
    </div>
  )
}
