import { IClient } from "../clients/client";

export interface NoRecentOrderReport {
  totalClients: number, 
	totalClientsNotRecentOrders: number
	clients: IClient[]
}