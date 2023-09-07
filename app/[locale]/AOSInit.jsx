'use client'
import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
const AOSInit= () => {
  useEffect(() => {
    Aos.init({ easing: 'ease-out-quad', duration: 1000 })
  }, [])
  return null
}
export default AOSInit