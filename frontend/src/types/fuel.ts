export type MonthlyFuelStat = {
  month: string;
  totalDistance: number;
  totalFuel: number;
  totalCost: number;
  avgFuelPer100km: number;
  fuelPrice: number;
};

export type VehicleFuelStat = {
  vehicleId: string;
  plateNo: string;
  totalDistance: number;
  totalFuel: number;
  totalCost: number;
  avgFuelPer100km: number;
  tripCount: number;
  isAbnormal: boolean;
};

export type FuelTrendPoint = {
  date: string;
  fuelPer100km: number;
  cost: number;
};
