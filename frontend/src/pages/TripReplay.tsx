import { Shell } from '../components/common/Shell';
import ReactECharts from 'echarts-for-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Timeline } from '../components/common/Timeline';
import { RoutePlayer } from '../components/scene/RoutePlayer';
import { useTripStore } from '../stores/tripStore';

export function TripReplay() {
  const { trips, activeTripId, setActiveTrip } = useTripStore();
  const trip = trips.find((item) => item.id === activeTripId) ?? trips[0];
  return <Shell title="路线回放" subtitle="回放车辆路线，同时对照速度变化与时间节点。">
    <div className="toolbar">{trips.map((item) => <button className="badge" onClick={() => setActiveTrip(item.id)} key={item.id}>{item.origin} → {item.destination}</button>)}</div>
    <div className="grid grid-2" style={{ marginTop: 16 }}>
      <div className="scene"><Canvas camera={{ position: [6, 5, 6] }}><ambientLight /><gridHelper args={[10,10]} /><RoutePlayer trip={trip} /><OrbitControls /></Canvas></div>
      <div className="panel"><ReactECharts className="chart" option={{ xAxis: { type: 'category', data: trip.route.map(p => p.time) }, yAxis: { type: 'value' }, series: [{ type: 'line', data: trip.route.map(p => p.speed), smooth: true, areaStyle: {} }] }} /><Timeline items={trip.route.map(p => ({ time: p.time, text: `速度 ${p.speed} km/h` }))} /></div>
    </div>
  </Shell>;
}
