"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"


import { Save } from "lucide-react"
import { Button } from "@mui/material"
import { concertApi } from "@/api/concert.api"

type Props = {
  onChange: (tab: string) => void
}

export default function CreateConcertForm({onChange}:Props) {
  const queryClient = useQueryClient()

  const [name, setName] = useState("")
  const [totalSeat, setTotalSeat] = useState(0)
  const [description, setDescription] = useState("")

  const createMutation = useMutation({
    mutationFn: () =>
      concertApi.createConcert({
        concertName: name,
        description,
        totalOfSeat: totalSeat,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["concerts"] })
      setName("")
      setTotalSeat(0)
      setDescription("")
      //alert("Concert created successfully")
      onChange("Overview")
    },

    onError: () => {
      alert("Create failed")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createMutation.mutate()
  }

  return (
    <div
      style={{
        marginTop: 20,
        background: "#fff",
        padding: 30,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginBottom: 20 }}>Create</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: 20 }}>
          <div style={{ flex: 1 }}>
            <label>Concert Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Please input concert name"
              style={inputStyle}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label>Total of seat</label>
            <input
              type="number"
              value={totalSeat}
              onChange={(e) => setTotalSeat(Number(e.target.value))}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please input description"
            style={{ ...inputStyle, height: 100 }}
          />
        </div>

        <div style={{ marginTop: 30, textAlign: "right"}} >
          <Button
            type="submit"
            disabled={name.trim() === "" || description.trim() === "" || totalSeat === 0}
            sx={{
              background: "#1976d2",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: 2,
              cursor: "pointer",
            }}
          >
            <Save size={18} className="mr-2"/>
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 8,
  marginTop: 5,
  borderRadius: 4,
  border: "1px solid #ccc",
}