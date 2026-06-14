import { Shell } from '../components/common/Shell';
import { AlertBanner } from '../components/common/AlertBanner';
import { StatPanel } from '../components/common/StatPanel';
import { VehicleScene } from '../components/scene/VehicleScene';
import { useVehicleStore } from '../stores/vehicleStore';
import { useAlertStore } from '../stores/alertStore';
import { useFuelStore } from '../stores/fuelStore';
import { useVehicleScene } from '../hooks/useVehicleScene';

export function Overview() {
  const { vehicles, zones, selectVehicle } = useVehicleStore();
  const { alerts } = useAlertStore();
  const { getCurrentMonthStat, getAbnormalVehicles } = useFuelStore();
  const stats = useVehicleScene(vehicles);
  const currentMonthStat = getCurrentMonthStat();
  const abnormalVehicles = getAbnormalVehicles();
  return <Shell title="3D 车辆总览" subtitle="车辆模型、区域热力和新报警在同一工作台中联动。">
    <div className="grid grid-4">
      <StatPanel label="活跃车辆" value={stats.activeCount} />
      <StatPanel label="维修车辆" value={stats.maintenanceCount} />
      <StatPanel label="未处理报警" value={alerts.filter(a => a.status === 'New').length} />
      <StatPanel label="当月油耗均值" value={currentMonthStat?.avgFuelPer100km.toFixed(1) + ' L/100km'} hint={abnormalVehicles.length + ' 台异常高耗'} />
    </div>
    <div style={{ height: 16 }} />
    <AlertBanner title="重点报警" detail={alerts[0].description} />
    <div style={{ height: 16 }} />
    <VehicleScene vehicles={vehicles} zones={zones} onSelect={selectVehicle} />
  </Shell>;
}
