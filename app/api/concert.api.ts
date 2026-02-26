import apiClient from "./client"
import { Concert } from "../types/concert.type"
import { Summary } from "../types/summary.type"
import { History } from "../types/history.type"

export const concertApi = {
  async getAllConcert(userId: string): Promise<Concert[]> {
    const res = await apiClient.get(`/tickets/user/${userId}`)
    return res.data;
  },

  async deleteById(id: string): Promise<void> {
    const res = await apiClient.delete(`/tickets/${id}`)
    return res.data;
  },

  async reservation(ticketId: string, userId: string, action: string): Promise<void> {
    const res = await apiClient.post(`/tickets/reservations`,
      {
        ticketId,
        userId,
        reserveAction: action
      }
    )
    return res.data;
  },

  async getSummary(): Promise<Summary> {
    const res = await apiClient.get(`/tickets/summary`)
    return res.data;
  },

  async createConcert(data: Partial<Concert>): Promise<Summary> {
    const res = await apiClient.post(`/tickets`,data)
    return res.data;
  },

  async history(): Promise<History[]> {
    const res = await apiClient.get(`/tickets/reservations`)
    return res.data;
  },

  async userHistory(userId:string): Promise<History[]> {
    const res = await apiClient.get(`/tickets/reservations/user/${userId}`)
    return res.data;
  },

}