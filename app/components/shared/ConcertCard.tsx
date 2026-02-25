import { Box, Button, Typography } from "@mui/material"
import { Trash2, User } from "lucide-react"
import { useState } from "react"
import ConfirmDeleteDialog from "../dialog/ConfirmDeleteDialog"
import { concertApi } from "@/app/api/concert.api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Concert } from "@/app/types/concert.type"

type Props = {
  concerts: Concert[]
}

export default function ConcertCard({ concerts }: Props) {
  const queryClient = useQueryClient()
  const [openDelete, setOpenDelete] = useState(false)
  const [selectedConcert, setSelectedConcert] = useState<Concert | null>(null)
  const deleteMutation = useMutation({
    mutationFn: (id: string) => concertApi.deleteById(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["concerts"] })
      setOpenDelete(false)
      setSelectedConcert(null)
    },

    onError: (error) => {
      console.error("Delete failed:", error)
      alert("Delete failed")
    }
  })

  const handleOpenDelete = (con: Concert) => {
    setSelectedConcert(con)
    setOpenDelete(true)
  }

  const handleConfirmDelete = () => {
    if (!selectedConcert) return

    deleteMutation.mutate(selectedConcert.id)

    setOpenDelete(false)
    setSelectedConcert(null)
  }

  return (
    <>
      {concerts?.map((card) => (
        <div
          key={card.id}
          style={{
            border: "1px solid #c1c1c1",
            padding: 20,
            borderRadius: 8,
            margin: "24px",
            backgroundColor: "white"
          }}>
          <Typography variant="h5" fontWeight="bold" color="primary">{card.concertName}</Typography>
          <hr className="border-gray-200 my-4"></hr>
          <p>{card.description}</p>

          <Box className="mt-6 mb-4" display="flex" justifyContent="space-between" alignItems="center">
            <Box sx={{ display: 'flex', gap: 1 }} >
              <User size={24} />
              <Typography>{card.totalOfSeat}</Typography>
            </Box>

            <Button
              variant="contained"
              color="error"
              sx={{ textTransform: 'none' }}
              onClick={() => handleOpenDelete(card)}
            >
              <Trash2 size={18} className="mr-2" />
              Delete
            </Button>
          </Box>
          <ConfirmDeleteDialog
            open={openDelete}
            title={selectedConcert?.concertName ?? ""}
            onCancel={() => setOpenDelete(false)}
            onConfirm={handleConfirmDelete}
          />
        </div>
      ))}
    </>
  )
}