export type History = {
  id: string
  ticketId: string
  action: "RESERVE" | "CANCEL"
  userId: string
  dataTime: string
  ticketName: string
}