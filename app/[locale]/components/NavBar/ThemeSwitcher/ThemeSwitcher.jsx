'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { BiSolidMoon } from 'react-icons/bi'
import { BsSunFill } from 'react-icons/bs'
import style from './ThemeSwitcher.module.css'

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme('ligth')

  const toggleTheme = theme === 'dark' ? 'light' : 'dark'

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div onClick={() => setTheme(toggleTheme)} className={style.mainContainer}>
      <div className={style.ball}></div>
      <BsSunFill style={theme === 'dark' ? { opacity: '0', transition: 'opacity .4s ease-in-out' } : null} className={style.iconSun} />
      <BiSolidMoon style={theme === 'light' ? { opacity: '0', transition: 'opacity .4s ease-in-out' } : null} className={style.iconMoon} />
    </div>
  )
}

export default ThemeSwitcher