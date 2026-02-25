"use client"

import AdminSidebar from "./components/layout/Sidebar";
import StatCard from "./components/dashboard/StatCard";
import Tabs from "./components/dashboard/Tabs";
import { useState } from "react";
import ConcertCard from "./components/shared/ConcertCard";
import { Award, CircleX, User } from "lucide-react";

export default function Home() {
  const [tab, setTab] = useState("Overview")
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />

      <main style={{ flex: 1, padding: 20 }}>
        <div style={{ display: "flex", gap: 20 }}>
          <StatCard icon={<User size={40} className="mx-auto mb-1" />} title="Total of seats" value={500} color="#1e6f9f" />
          <StatCard icon={<Award size={40} className="mx-auto mb-1" />} title="Reserve" value={120} color="#1abc9c" />
          <StatCard icon={<CircleX size={40} className="mx-auto mb-1" />} title="Cancel" value={12} color="#e74c3c" />
        </div>


        <Tabs active={tab} onChange={setTab} />
        {tab === "Overview" && (
          <>
            <ConcertCard
              name="Concert Name 1"
              description="orem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tristique odio non scelerisque venenatis. Donec rhoncus neque mauris, quis sodales lorem consectetur eu. Curabitur semper quam sit amet diam gravida, vel malesuada leo cursus. Maecenas eu neque vel tellus consectetur fermentum non vel erat. Donec arcu lectus, porttitor in lorem vel, dignissim euismod ex. In turpis augue, aliquet vel odio nec, dictum posuere arcu. Phasellus pellentesque enim enim, sit amet ultricies arcu ornare nec. Vivamus gravida gravida diam, eget feugiat ligula. Suspendisse potenti. Proin eleifend vel justo eget rhoncus. Donec faucibus neque lorem, a efficitur nunc tristique vulputate. Aenean lacinia leo eros. Proin et pretium nibh."
              seats={500}
            />

            <ConcertCard
              name="Concert Name 2"
              description="Lorem ipsum dolor sit amet..."
              seats={200}
            />
          </>
        )}

        {tab === "Create" && <div>Create form here</div>}
      </main>
    </div>
  );
}
