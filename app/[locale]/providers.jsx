'use client'
import { useState, useEffect } from "react"
import { ThemeProvider } from "next-themes"
import Loader from "./components/loader/Loader"

const Providers = ({ children }) => {
  const [mounted, setMounted] = useState(false)

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return <div style={{display:'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center', height:'100vh', width:'100vw'}}><Loader /><span></span></div>

  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}

export default Providers