"use client"

import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box
} from "@mui/material"
import { XCircle } from "lucide-react"

type Props = {
  open: boolean
  title: string
  onCancel: () => void
  onConfirm: () => void
}

export default function ConfirmDeleteDialog({
  open,
  title,
  onCancel,
  onConfirm
}: Props) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          p={2}
        >
          <XCircle size={48} color="#ef4444" />

          <Typography fontWeight="bold">
            Are you sure to delete?
          </Typography>

          <Typography fontWeight="bold">
            "{title}"
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
        <Button variant="outlined" onClick={onCancel} sx={{ textTransform: 'none' }}>
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          sx={{ textTransform: 'none' }}
        >
          Yes, Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}