import { Award, CircleX, User } from "lucide-react";
import StatCard from "./StatCard";
import { Concert } from "@/types/concert.type";
import { useQuery } from "@tanstack/react-query";
import { concertApi } from "@/api/concert.api";

type Props = {
    data: Concert[]
}

export default function StatCardBar({ data }: Props) {
    const { data: summary, isLoading, isError } = useQuery({
        queryKey: ["concerts"],
        queryFn: () => concertApi.getSummary(),
        staleTime: 0
    })
    const totalOfSeats = data.reduce((sum, cur) => {
        return sum + cur.totalOfSeat;
    }, 0);

    const reserve = summary?.RESERVE ?? 0;
    const cancel = summary?.CANCEL ?? 0;
    return (
        <div style={{ display: "flex", gap: 20 }}>
            <StatCard icon={<User size={40} className="mx-auto mb-1" />} title="Total of seats" value={totalOfSeats} color="#1e6f9f" />
            <StatCard icon={<Award size={40} className="mx-auto mb-1" />} title="Reserve" value={reserve} color="#1abc9c" />
            <StatCard icon={<CircleX size={40} className="mx-auto mb-1" />} title="Cancel" value={cancel} color="#e74c3c" />
        </div>
    )
}