"use client"

import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    TableContainer,
    Chip
} from "@mui/material"
import { History } from "@/app/types/history.type"

type Props = {
    data: History[]
}

export default function HistoryTable({ data }: Props) {
    function formatDateTime(iso: string) {
        const d = new Date(iso)

        const day = String(d.getDate()).padStart(2, "0")
        const month = String(d.getMonth() + 1).padStart(2, "0")
        const year = d.getFullYear()

        const hours = String(d.getHours()).padStart(2, "0")
        const minutes = String(d.getMinutes()).padStart(2, "0")
        const seconds = String(d.getSeconds()).padStart(2, "0")

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
    }
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date time</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Concert name</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{formatDateTime(row.dataTime)}</TableCell>
                            <TableCell>{row.userId}</TableCell>
                            <TableCell>{row.ticketName}</TableCell>
                            <TableCell>
                                <Chip
                                    label={row.action === "RESERVE" ? "Reserve" : "Cancel"}
                                    color={row.action === "RESERVE" ? "success" : "error"}
                                    size="small"
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}