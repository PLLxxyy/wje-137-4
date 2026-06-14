import { create } from 'zustand';
import { monthlyFuelStats, vehicleFuelStats, fuelTrend } from '../api/mockData';
import type { MonthlyFuelStat, VehicleFuelStat, FuelTrendPoint } from '../types';

type State = {
  monthlyStats: MonthlyFuelStat[];
  vehicleStats: VehicleFuelStat[];
  trend: FuelTrendPoint[];
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  getCurrentMonthStat: () => MonthlyFuelStat | undefined;
  getAbnormalVehicles: () => VehicleFuelStat[];
};

export const useFuelStore = create<State>((set, get) => ({
  monthlyStats: monthlyFuelStats,
  vehicleStats: vehicleFuelStats,
  trend: fuelTrend,
  selectedMonth: monthlyFuelStats[monthlyFuelStats.length - 1].month,
  setSelectedMonth: (month) => set({ selectedMonth: month }),
  getCurrentMonthStat: () => {
    const { monthlyStats, selectedMonth } = get();
    return monthlyStats.find((s) => s.month === selectedMonth);
  },
  getAbnormalVehicles: () => {
    const { vehicleStats } = get();
    return vehicleStats.filter((v) => v.isAbnormal);
  }
}));
