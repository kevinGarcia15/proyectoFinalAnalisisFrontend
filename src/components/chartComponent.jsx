import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const BugsChart = ({ data }) => {
  // Extraer los datos para las gráficas
  console.log(data)
  const projectNames = data.map((item) => item.nombreProyecto);
  const abiertos = data.map((item) => item.abierto);
  const enProgreso = data.map((item) => item.progreso);
  const cerrados = data.map((item) => item.cerrado);
  const promedioResolucion = data.map((item) => item.promResolucionHora);

  // Datos para la gráfica de barras
  const barData = {
    labels: projectNames,
    datasets: [
      {
        label: 'Abierto',
        data: abiertos,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'En Progreso',
        data: enProgreso,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Cerrado',
        data: cerrados,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  // Datos para la gráfica de líneas
  const lineData = {
    labels: projectNames,
    datasets: [
      {
        label: 'Promedio Resolución (Horas)',
        data: promedioResolucion,
        borderColor: 'rgba(153, 102, 255, 0.5)',
        backgroundColor: 'rgba(153, 102, 255, 0.1)',
        fill: true,
      },
    ],
  };

  return (
    <div>
      <h2>Estado de Bugs por Proyecto</h2>
      <Bar data={barData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      
      <h2 className="mt-8">Promedio de Resolución (Horas) por Proyecto</h2>
      <Line data={lineData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
    </div>
  );
};

export default BugsChart;
