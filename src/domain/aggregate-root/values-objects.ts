export interface Supplier {
  name: string;
  state: string;
  minimumKwh: string;
  costPerKwh: number;
  totalCustomers: number;
  averageRating: number;
}

export interface Energy {
  monthlyConsumption: number;
}
