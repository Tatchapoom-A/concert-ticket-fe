"use client"

import { useState } from "react"

type Props = {
  active: string
  onChange: (tab: string) => void
}

export default function Tabs({ active, onChange }: Props) {
  const tabs = ["Overview", "Create"]
  const [tab, setTab] = useState("Overview")
  return (
    <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          style={{
            border: "none",
            background: "none",
            borderBottom: active === tab ? "2px solid blue" : "none",
            paddingBottom: 6,
            cursor: "pointer",
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}