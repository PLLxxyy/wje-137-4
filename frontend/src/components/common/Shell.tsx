import { NavLink } from 'react-router-dom';
import { useThemeStore } from '../../stores/themeStore';

const nav = [
  ['/overview', '3D 总览'],
  ['/trip-replay', '路线回放'],
  ['/maintenance', '维修日历'],
  ['/alerts', '报警中心'],
  ['/vehicles', '车辆档案'],
  ['/fuel', '油耗分析']
];

export function Shell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <div className="app-shell" data-theme={theme}>
      <aside className="sidebar">
        <div className="brand">车辆管理<br/>三维看板</div>
        <nav className="nav">
          {nav.map(([to, label]) => (
            <NavLink key={to} to={to}>{label}</NavLink>
          ))}
        </nav>
      </aside>
      <main className="main">
        <div className="page-head">
          <div>
            <h1 className="page-title">{title}</h1>
            <p className="page-subtitle">{subtitle}</p>
          </div>
          <button className="badge" onClick={toggleTheme}>
            {theme === 'dark' ? '浅色' : '深色'}模式
          </button>
        </div>
        {children}
      </main>
    </div>
  );
}
