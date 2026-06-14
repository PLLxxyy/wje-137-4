import { Shell } from '../components/common/Shell';
import { CalendarCell } from '../components/common/CalendarCell';
import { StatusBadge } from '../components/common/StatusBadge';
import { useCalendar } from '../hooks/useCalendar';
import { useMaintenanceStore } from '../stores/maintenanceStore';

export function MaintenanceCalendar() {
  const { records } = useMaintenanceStore();
  const cells = useCalendar(records);
  return <Shell title="维修日历" subtitle="车辆维保计划、历史费用和逾期风险集中排查。">
    <div className="grid grid-3">{cells.map((cell) => <CalendarCell key={cell.day} day={cell.day} items={cell.items} />)}</div>
    <div className="panel" style={{ marginTop: 16 }}>{records.map((r) => <div className="row" key={r.id}><span>{r.vendor} · {r.items.join('、')}</span><StatusBadge status={r.type} /></div>)}</div>
  </Shell>;
}
