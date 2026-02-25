"use client"

import { useRole } from "@/app/context/RoleContext"
import { Box, List, ListItemButton, Typography } from "@mui/material"
import { useState } from "react"
import { House, Inbox, RefreshCcw } from "lucide-react"

export default function Sidebar() {
  const [selectedKey, setSelectedKey] = useState("home")
  const { role, setRole } = useRole()
  const menuAdmin = [
    { label: "Home", href: "/", key: "home", icon: <House className="mt-0.5" size={18} /> },
    { label: "History", href: "/history", key: "history", icon: <Inbox className="mt-0.5" size={18} /> },
  ];


  const menu = role?.role === "Admin" ? menuAdmin : []

  return (
    <aside style={{ width: 220, padding: 20, borderRight: "1px solid #ddd", backgroundColor: "white" }}>
      <Typography variant="h5" fontWeight="bold">{role?.role}</Typography>

      <List style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {menu.map((item) => (
          <ListItemButton
            key={item.key}
            selected={item.key === selectedKey}
            onClick={(event: any) => {
              setSelectedKey(item.key);
            }}
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
          onClick={(event: any) => {
            if (role?.role === "Admin") {
              setRole({ role: "User", userId: "002" })
            } else {
              setRole({ role: "Admin", userId: "001" })
            }

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