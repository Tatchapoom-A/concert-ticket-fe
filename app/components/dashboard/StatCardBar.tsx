import { Award, CircleX, User } from "lucide-react";
import StatCard from "./StatCard";

export default function StatCardBar() {
    return (
        <div style={{ display: "flex", gap: 20 }}>
          <StatCard icon={<User size={40} className="mx-auto mb-1" />} title="Total of seats" value={500} color="#1e6f9f" />
          <StatCard icon={<Award size={40} className="mx-auto mb-1" />} title="Reserve" value={120} color="#1abc9c" />
          <StatCard icon={<CircleX size={40} className="mx-auto mb-1" />} title="Cancel" value={12} color="#e74c3c" />
        </div>
    )
}