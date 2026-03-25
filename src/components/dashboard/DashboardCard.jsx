export default function DashboardCard({ title, children, style, className = "" }) {
  return (
    <div className={`dashboard-card ${className}`} style={style}>
      <p>{title}</p>
      {children}
    </div>
  );
}