"use client"

import Sidebar from "./components/layout/Sidebar";
import Tabs from "./components/dashboard/Tabs";
import ConcertCard from "./components/shared/ConcertCard";
import StatCardBar from "./components/dashboard/StatCardBar";
import { useRole } from "./context/RoleContext";
import { useQuery } from "@tanstack/react-query";
import { concertApi } from "./api/concert.api";
import { useEffect, useState } from "react";

export default function Home() {

  const [tab, setTab] = useState("Overview")
  const { role } = useRole()
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["concerts", tab, role],
    queryFn: () => concertApi.getAllConcert(),
    staleTime: 0
  })

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading concerts</p>
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: 20 }}>
        {role?.role === "Admin" ? (
          <>
            <StatCardBar />
            <Tabs active={tab} onChange={setTab}/>
            {tab === "Overview" && (<ConcertCard concerts={data ?? []}/>)}
            {tab === "Create" && <div>Create form here</div>}
          </>
        ) : (
          <ConcertCard concerts={data ?? []}/>
        )}

      </main>
    </div>
  );
}
