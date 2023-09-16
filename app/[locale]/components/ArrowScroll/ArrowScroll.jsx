'use client'
import React, { useState, useEffect } from 'react'
import style from './ArrowScroll.module.css'
import { MdOutlineDoubleArrow } from 'react-icons/md'
const ArrowScroll = () => {

  const [scrollTop, setScrollTop] = useState(0);


  useEffect(()=>{
    const handleScroll = event => {
      const { scrollTop } = event.target;
      setScrollTop(scrollTop)
    };
    window.addEventListener('scroll', handleScroll)
    return window.removeEventListener('scroll', handleScroll)
  }, []) 

  return (
    <div className={style.arrowScroll}>
      {scrollTop === 0 &&
      <MdOutlineDoubleArrow style={{transform: 'rotate(90deg)'}}/>
      }
    </div>
  )
}

export default ArrowScroll