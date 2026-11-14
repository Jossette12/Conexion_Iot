export default function HistoryTable({ rows }) {
  return (
    <section>
      <h2>Últimos 10 datos</h2>
      <table>
        <thead>
          <tr>
            <th>Hora</th>
            <th>Temp (°C)</th>
            <th>Humedad (%)</th>
            <th>Agua (%)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r._id ?? r.timestamp}>
              <td>{new Date(r.timestamp).toLocaleTimeString()}</td>
              <td>{r.temperatura}</td>
              <td>{r.humedad}</td>
              <td>{r.nivelAguaPct}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
