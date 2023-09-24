import React from 'react'
import style from './MsgContact.module.css'
const MsgContact = ({modalContact}) => {

  return (
    <div className={style.msgContact}>
      <div className={style.titleContainer}>
        <h1>"{modalContact.p1}</h1>
        <h1>{modalContact.p2}</h1>
        <h1>{modalContact.p3}"</h1>
      </div>
    </div>
  )
}

export default MsgContact