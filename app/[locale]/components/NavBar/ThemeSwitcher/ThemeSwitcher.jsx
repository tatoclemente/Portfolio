'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { BiSolidMoon } from 'react-icons/bi'
import { BsSunFill } from 'react-icons/bs'

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme('ligth')

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div style={{cursor: 'pointer'}}>
      {theme === 'dark' ? (
        <BsSunFill size={25} onClick={() => setTheme('light')} />
      ) : (
        <BiSolidMoon size={25} onClick={() => setTheme('dark')} />
      )}
    </div>
  )
}

export default ThemeSwitcher