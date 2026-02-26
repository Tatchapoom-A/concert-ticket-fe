"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import { RoleProvider } from "../context/RoleContext"

export default function Providers({
    children,
}: {
    children: React.ReactNode
}) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <RoleProvider>
                {children}
            </RoleProvider>
        </QueryClientProvider>
    )
}