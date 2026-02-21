export interface Customer {
  customer_name: string;
  phone: string;
  segment: string;
  total_orders: number;
  total_spent: number;
  last_order_date?: string;
}

export type Segment = "VIP" | "ACTIVE" | "SLEEPING" | "LOST";

export interface CampaignHistoryItem {
  id: string;
  name: string;
  segment: string;
  status: "Running" | "Completed" | "Failed";
  sent: number;
  date: string;
}
