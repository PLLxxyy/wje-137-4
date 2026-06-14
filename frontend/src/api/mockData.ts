import { AlertStatus, AlertType, MaintenanceType, VehicleStatus, VehicleType, type AlertEvent, type MaintenanceRecord, type TripRecord, type Vehicle, type ZoneStat, type MonthlyFuelStat, type VehicleFuelStat, type FuelTrendPoint } from '../types';

export const vehicles: Vehicle[] = [
  { id: 'v1', plateNo: '沪A-7812', type: VehicleType.Truck, brandModel: '东风天龙 KL', color: '#0f766e', year: 2022, mileage: 126800, status: VehicleStatus.Active, location: { lng: 121.47, lat: 31.23, z: 0 } },
  { id: 'v2', plateNo: '苏E-4098', type: VehicleType.SUV, brandModel: '哈弗 H9', color: '#b45309', year: 2021, mileage: 84300, status: VehicleStatus.Parked, location: { lng: 120.62, lat: 31.30, z: 0 } },
  { id: 'v3', plateNo: '浙B-6621', type: VehicleType.Special, brandModel: '徐工抢修车', color: '#991b1b', year: 2020, mileage: 157200, status: VehicleStatus.Maintenance, location: { lng: 121.55, lat: 29.86, z: 0 } }
];

export const trips: TripRecord[] = [
  { id: 't1', vehicleId: 'v1', origin: '上海闵行', destination: '苏州吴中', departAt: '08:00', arriveAt: '10:20', distance: 112, avgSpeed: 62, maxSpeed: 91, fuel: 31, route: [{ lng: 121.47, lat: 31.23, time: '08:00', speed: 0 }, { lng: 121.1, lat: 31.22, time: '09:00', speed: 76 }, { lng: 120.62, lat: 31.30, time: '10:20', speed: 0 }] },
  { id: 't2', vehicleId: 'v2', origin: '苏州园区', destination: '宁波北仑', departAt: '13:10', arriveAt: '17:35', distance: 248, avgSpeed: 68, maxSpeed: 98, fuel: 44, route: [{ lng: 120.62, lat: 31.30, time: '13:10', speed: 0 }, { lng: 121.02, lat: 30.62, time: '15:00', speed: 86 }, { lng: 121.55, lat: 29.86, time: '17:35', speed: 0 }] }
];

export const maintenance: MaintenanceRecord[] = [
  { id: 'm1', vehicleId: 'v1', type: MaintenanceType.Routine, items: ['机油', '制动检查'], cost: 1800, date: '2026-06-08', nextDate: '2026-09-08', vendor: '闵行维保站', note: '例行保养完成' },
  { id: 'm2', vehicleId: 'v3', type: MaintenanceType.Repair, items: ['液压系统'], cost: 6200, date: '2026-06-12', nextDate: '2026-07-12', vendor: '宁波工程车服务', note: '等待配件到货' }
];

export const zones: ZoneStat[] = [
  { id: 'z1', name: '华东干线', boundary: [], vehicleCount: 21, violationCount: 2, avgSpeed: 71 },
  { id: 'z2', name: '港区短驳', boundary: [], vehicleCount: 12, violationCount: 5, avgSpeed: 38 }
];

export const alerts: AlertEvent[] = [
  { id: 'a1', vehicleId: 'v1', type: AlertType.Speeding, time: '09:12', location: { lng: 121.1, lat: 31.22 }, description: 'G50 高速短时超速', status: AlertStatus.New },
  { id: 'a2', vehicleId: 'v3', type: AlertType.Maintenance, time: '11:20', location: { lng: 121.55, lat: 29.86 }, description: '液压系统维修逾期风险', status: AlertStatus.Acknowledged }
];

export const monthlyFuelStats: MonthlyFuelStat[] = [
  { month: '2026-01', totalDistance: 8520, totalFuel: 724.2, totalCost: 5431.5, avgFuelPer100km: 8.5, fuelPrice: 7.5 },
  { month: '2026-02', totalDistance: 7830, totalFuel: 673.4, totalCost: 5050.5, avgFuelPer100km: 8.6, fuelPrice: 7.5 },
  { month: '2026-03', totalDistance: 9640, totalFuel: 809.8, totalCost: 6073.5, avgFuelPer100km: 8.4, fuelPrice: 7.5 },
  { month: '2026-04', totalDistance: 10250, totalFuel: 871.3, totalCost: 6534.8, avgFuelPer100km: 8.5, fuelPrice: 7.5 },
  { month: '2026-05', totalDistance: 11560, totalFuel: 1017.3, totalCost: 7630.0, avgFuelPer100km: 8.8, fuelPrice: 7.5 },
  { month: '2026-06', totalDistance: 10890, totalFuel: 947.4, totalCost: 7105.5, avgFuelPer100km: 8.7, fuelPrice: 7.5 }
];

export const vehicleFuelStats: VehicleFuelStat[] = [
  { vehicleId: 'v1', plateNo: '沪A-7812', totalDistance: 12680, totalFuel: 1077.8, totalCost: 8083.5, avgFuelPer100km: 8.5, tripCount: 42, isAbnormal: false },
  { vehicleId: 'v2', plateNo: '苏E-4098', totalDistance: 8430, totalFuel: 758.7, totalCost: 5690.3, avgFuelPer100km: 9.0, tripCount: 28, isAbnormal: false },
  { vehicleId: 'v3', plateNo: '浙B-6621', totalDistance: 15720, totalFuel: 1729.2, totalCost: 12969.0, avgFuelPer100km: 11.0, tripCount: 36, isAbnormal: true }
];

export const fuelTrend: FuelTrendPoint[] = [
  { date: '06-01', fuelPer100km: 8.3, cost: 62.25 },
  { date: '06-02', fuelPer100km: 8.5, cost: 63.75 },
  { date: '06-03', fuelPer100km: 8.7, cost: 65.25 },
  { date: '06-04', fuelPer100km: 8.6, cost: 64.50 },
  { date: '06-05', fuelPer100km: 8.4, cost: 63.00 },
  { date: '06-06', fuelPer100km: 8.8, cost: 66.00 },
  { date: '06-07', fuelPer100km: 9.0, cost: 67.50 },
  { date: '06-08', fuelPer100km: 8.9, cost: 66.75 },
  { date: '06-09', fuelPer100km: 8.7, cost: 65.25 },
  { date: '06-10', fuelPer100km: 8.6, cost: 64.50 },
  { date: '06-11', fuelPer100km: 8.8, cost: 66.00 },
  { date: '06-12', fuelPer100km: 9.1, cost: 68.25 },
  { date: '06-13', fuelPer100km: 8.9, cost: 66.75 },
  { date: '06-14', fuelPer100km: 8.7, cost: 65.25 },
  { date: '06-15', fuelPer100km: 8.6, cost: 64.50 }
];
