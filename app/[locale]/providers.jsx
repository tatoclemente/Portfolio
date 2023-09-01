'use client'
import { useState, useEffect } from "react"
import { ThemeProvider } from "next-themes"

const providers = ({ children }) => {
  const [mounted, setMounted] = useState(false)

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return <>Loading...</>

  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}

export default providers