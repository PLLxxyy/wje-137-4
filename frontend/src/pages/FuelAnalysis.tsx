import { Shell } from '../components/common/Shell';
import ReactECharts from 'echarts-for-react';
import { StatPanel } from '../components/common/StatPanel';
import { useFuelStore } from '../stores/fuelStore';
import { useThemeStore } from '../stores/themeStore';

export function FuelAnalysis() {
  const { theme } = useThemeStore();
  const { monthlyStats, vehicleStats, trend, selectedMonth, setSelectedMonth, getCurrentMonthStat, getAbnormalVehicles } = useFuelStore();
  const currentStat = getCurrentMonthStat();
  const abnormalVehicles = getAbnormalVehicles();

  const textColor = theme === 'dark' ? '#f0eadf' : '#202018';
  const mutedColor = theme === 'dark' ? '#b7afa0' : '#716b5f';
  const lineColor = theme === 'dark' ? '#3d463b' : '#d8d0c1';
  const accentColor = theme === 'dark' ? '#5eead4' : '#0f766e';
  const accent2Color = theme === 'dark' ? '#f59e0b' : '#b45309';

  const trendOption = {
    tooltip: { trigger: 'axis' },
    legend: { data: ['百公里油耗(L)', '百公里费用(元)'], textStyle: { color: textColor } },
    grid: { left: 40, right: 40, top: 40, bottom: 30 },
    xAxis: {
      type: 'category',
      data: trend.map((t) => t.date),
      axisLine: { lineStyle: { color: lineColor } },
      axisLabel: { color: mutedColor }
    },
    yAxis: [
      { type: 'value', name: 'L/100km', axisLine: { lineStyle: { color: lineColor } }, axisLabel: { color: mutedColor }, splitLine: { lineStyle: { color: lineColor } } },
      { type: 'value', name: '元/100km', axisLine: { lineStyle: { color: lineColor } }, axisLabel: { color: mutedColor }, splitLine: { show: false } }
    ],
    series: [
      { name: '百公里油耗(L)', type: 'line', smooth: true, data: trend.map((t) => t.fuelPer100km), itemStyle: { color: accentColor }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: accentColor + '40' }, { offset: 1, color: accentColor + '05' }] } } },
      { name: '百公里费用(元)', type: 'line', smooth: true, yAxisIndex: 1, data: trend.map((t) => t.cost), itemStyle: { color: accent2Color } }
    ]
  };

  const monthlyOption = {
    tooltip: { trigger: 'axis' },
    legend: { data: ['总里程(km)', '总油耗(L)', '总费用(元)'], textStyle: { color: textColor } },
    grid: { left: 40, right: 40, top: 40, bottom: 30 },
    xAxis: {
      type: 'category',
      data: monthlyStats.map((s) => s.month.slice(5) + '月'),
      axisLine: { lineStyle: { color: lineColor } },
      axisLabel: { color: mutedColor }
    },
    yAxis: [
      { type: 'value', name: 'km / L', axisLine: { lineStyle: { color: lineColor } }, axisLabel: { color: mutedColor }, splitLine: { lineStyle: { color: lineColor } } },
      { type: 'value', name: '元', axisLine: { lineStyle: { color: lineColor } }, axisLabel: { color: mutedColor }, splitLine: { show: false } }
    ],
    series: [
      { name: '总里程(km)', type: 'bar', data: monthlyStats.map((s) => s.totalDistance), itemStyle: { color: accentColor } },
      { name: '总油耗(L)', type: 'bar', data: monthlyStats.map((s) => s.totalFuel), itemStyle: { color: accent2Color } },
      { name: '总费用(元)', type: 'line', smooth: true, yAxisIndex: 1, data: monthlyStats.map((s) => s.totalCost), itemStyle: { color: '#b91c1c' } }
    ]
  };

  return (
    <Shell title="油耗分析" subtitle="按月度和单车维度统计百公里油耗与费用，快速识别高耗异常。">
      <div className="grid grid-4">
        <StatPanel label="当月百公里油耗" value={currentStat?.avgFuelPer100km.toFixed(1) + ' L'} hint="较上月 +0.1" />
        <StatPanel label="当月总油耗" value={currentStat?.totalFuel.toLocaleString() + ' L'} hint={'总里程 ' + currentStat?.totalDistance.toLocaleString() + ' km'} />
        <StatPanel label="当月油费" value={'¥ ' + currentStat?.totalCost.toLocaleString()} hint={'油价 ¥' + currentStat?.fuelPrice + '/L'} />
        <StatPanel label="异常高耗车辆" value={abnormalVehicles.length + ' 台'} hint="需关注核查" />
      </div>

      <div style={{ height: 16 }} />

      <div className="panel">
        <div className="toolbar" style={{ marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>当月油耗趋势</h2>
          <div className="toolbar">
            {monthlyStats.map((s) => (
              <button
                key={s.month}
                className={'badge'}
                style={{
                  background: selectedMonth === s.month ? 'var(--accent)' : undefined,
                  color: selectedMonth === s.month ? 'var(--panel)' : undefined
                }}
                onClick={() => setSelectedMonth(s.month)}
              >
                {s.month.slice(5)}月
              </button>
            ))}
          </div>
        </div>
        <ReactECharts className="chart" option={trendOption} />
      </div>

      <div style={{ height: 16 }} />

      <div className="grid grid-2">
        <div className="panel">
          <h2 style={{ marginTop: 0 }}>月度统计</h2>
          <ReactECharts className="chart" option={monthlyOption} />
        </div>

        <div className="panel">
          <h2 style={{ marginTop: 0 }}>单车油耗排行</h2>
          <div className="list">
            {[...vehicleStats].sort((a, b) => b.avgFuelPer100km - a.avgFuelPer100km).map((v, idx) => (
              <div className="row" key={v.vehicleId} style={{ borderColor: v.isAbnormal ? 'var(--danger)' : undefined }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className="badge" style={{ minWidth: 24, justifyContent: 'center' }}>{idx + 1}</span>
                  <div>
                    <strong>{v.plateNo}</strong>
                    <span className="muted" style={{ marginLeft: 8 }}>{v.tripCount} 次行程</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <strong className={v.isAbnormal ? 'danger' : ''}>{v.avgFuelPer100km.toFixed(1)} L/100km</strong>
                  <div className="muted">¥ {v.totalCost.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}
