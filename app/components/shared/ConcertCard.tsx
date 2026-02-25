import { Box, Button, colors, Typography } from "@mui/material"
import { Trash2, User } from "lucide-react"

type Props = {
  name: string
  description: string
  seats: number
  action?: React.ReactNode
}

export default function ConcertCard({
  name,
  description,
  seats,
  action,
}: Props) {
  return (
    <div style={{
      border: "1px solid #c1c1c1",
      padding: 20,
      borderRadius: 8,
      margin: "24px",
      backgroundColor: "white"
    }}>
      <Typography variant="h5" fontWeight="bold" color="primary">{name}</Typography>
      <hr className="border-gray-200 my-4"></hr>
      <p>{description}</p>

      <Box className="mt-6 mb-4" display="flex" justifyContent="space-between" alignItems="center">
        <Box display="inline-flex">
          <User size={24} />
          <Typography>{seats}</Typography>

        </Box>
        <Button variant="contained" color="error" sx={{ textTransform: 'none' }}>
          <Trash2 size={18} className="mr-2" />
          Delete
        </Button>
      </Box>
      {action}

    </div>
  )
}