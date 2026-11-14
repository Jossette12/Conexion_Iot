import { useEffect, useState } from 'react';
import { api, socket } from './services/api.js';
import SensorCard from './components/SensorCard.jsx';
import HistoryTable from './components/HistoryTable.jsx';
import AlertList from './components/AlertList.jsx';

export default function App() {
  const [latest, setLatest] = useState(null);
  const [history, setHistory] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Carga inicial por HTTP
    api.latest().then(setLatest).catch(console.error);
    api.history().then(setHistory).catch(console.error);

    // Tiempo real por WebSocket
    socket.connect();
    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));
    socket.on('new-reading', (reading) => {
      setLatest(reading);
      setHistory((prev) => [reading, ...prev].slice(0, 10));
    });

    return () => {
      socket.off();
      socket.disconnect();
    };
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Conexión IoT</h1>
        <span className={`status ${connected ? 'ok' : 'off'}`}>
          {connected ? 'En vivo' : 'Desconectado'}
        </span>
      </header>

      {latest ? (
        <>
          <section className="cards">
            <SensorCard label="Temperatura" value={latest.temperatura} unit="°C" />
            <SensorCard label="Humedad" value={latest.humedad} unit="%" />
            <SensorCard label="Nivel de agua" value={latest.nivelAguaPct} unit="%" />
          </section>
          <AlertList alerts={latest.alerts ?? []} />
        </>
      ) : (
        <p>Esperando datos del sensor…</p>
      )}

      {/* TODO (Integrante 3): gráfico en tiempo real (Chart.js / Recharts) */}

      <HistoryTable rows={history} />
    </main>
  );
}
