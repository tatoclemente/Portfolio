'use client'
import React, { useState, useEffect } from 'react'
import style from './ArrowScroll.module.css'
import { MdOutlineDoubleArrow } from 'react-icons/md'
const ArrowScroll = () => {

  const [scrollTop, setScrollTop] = useState(0);

useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.pageYOffset || document.documentElement.scrollTop)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    const target = document.getElementById('projects')
    if (target) {
      window.scrollTo({ top: target.offsetTop, behavior: 'smooth' })
    }
  }

  return (
    <button
      className={style.arrowScroll}
      onClick={handleClick}
    >
      {scrollTop === 0 &&
      <MdOutlineDoubleArrow style={{transform: 'rotate(90deg)'}}/>
      }
    </button>
  )
}

export default ArrowScroll