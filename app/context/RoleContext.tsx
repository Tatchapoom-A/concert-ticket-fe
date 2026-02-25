"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Role = { role: string; userId: string }

const RoleContext = createContext<{
  role: Role | null
  setRole: (r: Role) => void
} | null>(null)

export function RoleProvider({ children }: { children: React.ReactNode }) {

  const [role, setRole] = useState<Role | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const savedRole = localStorage.getItem("role")

    if (savedRole) {
      try {
        setRole(JSON.parse(savedRole))
      } catch {
        localStorage.removeItem("role")
      }
    }

    setReady(true)
  }, [])

  useEffect(() => {
    if (role) {
      localStorage.setItem("role", JSON.stringify(role))
    }
  }, [role])

  if (!ready) return null

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  const ctx = useContext(RoleContext)
  if (!ctx) throw new Error("useRole must be used inside RoleProvider")
  return ctx
}