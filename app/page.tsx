"use client"

import Sidebar from "./components/layout/Sidebar";
import Tabs from "./components/dashboard/Tabs";
import ConcertCard from "./components/shared/ConcertCard";
import StatCardBar from "./components/dashboard/StatCardBar";
import { useRole } from "./context/RoleContext";
import { useQuery } from "@tanstack/react-query";
import { concertApi } from "./api/concert.api";
import { useState } from "react";
import CreateConcertForm from "./components/concert/CreateConcertForm";

export default function Home() {

  const [tab, setTab] = useState("Overview")
  const { role } = useRole()
  const { data, isLoading, isError } = useQuery({
    queryKey: ["concerts", tab, role],
    queryFn: () => concertApi.getAllConcert(role?.userId ?? ""),
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
            <StatCardBar data={data ?? []}/>
            <Tabs active={tab} onChange={setTab}/>
            {tab === "Overview" && (<ConcertCard concerts={data ?? [] } forAdmin={true}/>)}
            {tab === "Create" && <div><CreateConcertForm onChange={setTab}/></div>}
          </>
        ) : (
          <ConcertCard forAdmin={false} concerts={data ?? []}/>
        )}
      </main>
    </div>
  );
}
