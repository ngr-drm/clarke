import { z } from 'zod';

export interface Supplier {
  name: string;
  state: string;
  minimumKwh: number;
  costPerKwh: number;
  totalCustomers: number;
  averageRating: number;
}

export interface Energy {
  monthlyConsumption: number;
}

export const supplierValidator = z.object({
  name: z.string(),
  state: z.string(),
  minimumKwh: z.number().gt(0, 'minimum kwh value must be greater than zero'),
  costPerKwh: z.number(),
  totalCustomers: z.number(),
  averageRating: z.number(),
});

export const energyValidator = z.object({
  monthlyConsumption: z.number().gt(0, 'minimum kwh value must be greater than zero'),
});
