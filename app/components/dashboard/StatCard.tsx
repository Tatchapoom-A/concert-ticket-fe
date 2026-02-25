import { Typography } from "@mui/material"
import { ReactNode } from "react"

type Props = {
  title: string
  value: number
  color: string
  icon: ReactNode
}

export default function StatCard({ title, value, color, icon }: Props) {
  return (
    <div
      style={{
        height: "200px",
        minWidth: "150px",
        background: color,
        color: "white",
        padding: 20,
        borderRadius: 8,
        flex: 1,
        justifyItems: "center",
        alignContent: "center"
      }}
    >
      
      <div className="flex justify-center mb-2">
        {icon}
      </div>
      <Typography>{title}</Typography><br/>
      <Typography variant="h3">{value}</Typography>
    </div>
  )
}