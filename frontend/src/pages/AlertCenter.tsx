import { Shell } from '../components/common/Shell';
import { AlertBanner } from '../components/common/AlertBanner';
import { StatusBadge } from '../components/common/StatusBadge';
import { useAlertStore } from '../stores/alertStore';

export function AlertCenter() {
  const { alerts, resolve } = useAlertStore();
  return <Shell title="报警中心" subtitle="按报警类型和处理状态筛选，直接确认处理结果。">
    <AlertBanner title="新报警优先处理" detail="超速、围栏和维保类报警会影响调度可用性。" />
    <div className="list" style={{ marginTop: 16 }}>{alerts.map((a) => <div className="row" key={a.id}><span><strong>{a.type}</strong><span className="block muted">{a.description}</span></span><span className="toolbar"><StatusBadge status={a.status} /><button className="badge" onClick={() => resolve(a.id)}>处理</button></span></div>)}</div>
  </Shell>;
}
