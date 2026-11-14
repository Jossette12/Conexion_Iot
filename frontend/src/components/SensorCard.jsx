export default function SensorCard({ label, value, unit }) {
  return (
    <div className="card">
      <span className="card-label">{label}</span>
      <span className="card-value">
        {value ?? '—'}
        <small>{unit}</small>
      </span>
    </div>
  );
}
