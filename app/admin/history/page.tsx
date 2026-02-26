"use client"

import Sidebar from "@/components/layout/Sidebar"
import HistoryTable from "@/components/history/HistoryTable"
import { useQuery } from "@tanstack/react-query"
import { concertApi } from "@/api/concert.api"

export default function HistoryPage() {

  const { data, isLoading, isError } = useQuery({
    queryKey: ["history"],
    queryFn: () => concertApi.history()
  })

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading history</p>

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <main style={{ flex: 1, padding: 24 }}>
        <h2>History</h2>
        <HistoryTable data={data ?? []} />
      </main>
    </div>
  )
}