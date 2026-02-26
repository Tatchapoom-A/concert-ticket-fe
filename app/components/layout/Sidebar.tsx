"use client"

import { useRole } from "@/app/context/RoleContext"
import { Box, List, ListItemButton, Typography } from "@mui/material"
import { useState } from "react"
import { House, Inbox, RefreshCcw } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

export default function Sidebar() {
  const { role, setRole } = useRole()
  const menuAdmin = [
    { label: "Home", href: "/", key: "", icon: <House className="mt-0.5" size={18} /> },
    { label: "History", href: `/${role?.role.toLocaleLowerCase()}/history`, key: "history", icon: <Inbox className="mt-0.5" size={18} /> },
  ];
  const pathname = usePathname()
  const splittedPath = pathname.split("/");
  const currentPath = splittedPath[splittedPath.length -1]
  const router = useRouter()

  return (
    <aside style={{ width: 220, padding: 20, borderRight: "1px solid #ddd", backgroundColor: "white" }}>
      <Typography variant="h5" fontWeight="bold">{role?.role}</Typography>

      <List style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {menuAdmin.map((item) => (
          <ListItemButton
            key={item.key}
            selected={item.key === currentPath}
            href={item.href}
          >
            <Box sx={{ display: 'flex', gap: 1 }}>
              {item.icon}
              {item.label}
            </Box>
          </ListItemButton>
        ))}

        <ListItemButton
          key="switch-role"
          selected={"switch-role" === currentPath}
          onClick={(event: any) => {
            if (role?.role === "Admin") {
              setRole({ role: "User", userId: "Poom" })
            } else {
              setRole({ role: "Admin", userId: "Admin001" })
            }
            router.push("/")
          }}
        >
          <Box sx={{ display: 'flex', gap: 1 }}>
            <RefreshCcw className="mt-0.5" size={18} />
            Switch to {role?.role === "Admin" ? "user" : "admin"}
          </Box>
        </ListItemButton>
      </List>
    </aside>
  )
}