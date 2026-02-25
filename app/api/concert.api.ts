import apiClient from "./client"
import { Concert } from "../types/concert.type"

export const concertApi = {
  async getAllConcert(): Promise<Concert[]> {
    const res = await apiClient.get('/tickets')
    return res.data;
  },

  async deleteById(id: string): Promise<void> {
    const res = await apiClient.delete(`/tickets/${id}`)
    return res.data;
  },

}