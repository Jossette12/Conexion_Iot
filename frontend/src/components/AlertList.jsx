export default function AlertList({ alerts }) {
  if (!alerts.length) return <div className="alert ok">Todo en orden</div>;
  return (
    <div>
      {alerts.map((a) => (
        <div key={a.tipo} className="alert danger">
          {a.mensaje}
        </div>
      ))}
    </div>
  );
}
