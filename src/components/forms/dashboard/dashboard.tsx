"use client"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { motion } from 'framer-motion';
import { User, Home, GraduationCap, Calendar } from 'lucide-react';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import type { LatLngTuple } from 'leaflet';
import { getDashboard, getGraph } from '@/service/api';
import { useEffect, useState } from 'react';
import { Graph } from '@/types/graph';
import { Total } from '@/types/dashboard';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [graph, setGraph] = useState<Graph>({
    labels:["Avr"],
    datasets:[]
  });
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [total,setTotal]=useState<Total>({
    totalEvents:0,
    totalUniversities:0,
    totalAccommodations:0,
    totalUsers:0
  })
  const t=useTranslations('Dashboard')

  useEffect(() => {
    setIsClient(true);
    const fetchData = async () => {
      const data = await getGraph();
      console.log(data); 
      setGraph(data);
    };
    const fetchTotal=async()=>{
      const total=await getDashboard()
      console.log(total)
      setTotal(total)
    };

    Promise.all([
      fetchTotal(),
      fetchData()
    ])
  }, []);

  useEffect(()=>{
    const fetchTotal=async()=>{
      const total=await getDashboard()
      console.log(total)
      setTotal(total)
    };
    fetchTotal()
  },[])

  if (!isClient) {
    return null;
  }

  const mainStats = [
    { 
      title: t('Users'), 
      value: total.totalUsers, 
      change: '+324', 
      icon: <User size={24} />, 
      color: 'bg-card text-card-foreground' 
    },
    { 
      title: t('Accommodations'), 
      value: total.totalAccommodations, 
      change: '+58', 
      icon: <Home size={24} />, 
      color: 'bg-card text-card-foreground' 
    },
    { 
      title: t('Universities'), 
      value: total.totalUniversities, 
      change: '+3', 
      icon: <GraduationCap size={24} />, 
      color: 'bg-card text-card-foreground' 
    },
    { 
      title: t('Event'), 
      value: total.totalEvents, 
      change: '+11', 
      icon: <Calendar size={24} />, 
      color: 'bg-card text-card-foreground' 
    },
    
  ];

  const lineData = {
    labels: Array.isArray(graph) ? graph.map(item => item.month) : [],
    datasets: [
      {
        label: 'Propriétaires',
        data: Array.isArray(graph) ? graph.map(item => item.owner) : [],
        borderColor: '#0284c7',
        tension: 0.4,
      },
      {
        label: 'Étudiants',
        data: Array.isArray(graph) ? graph.map(item => item.student) : [],
        borderColor: '#34d399',
        tension: 0.4,
      },
      {
        label: 'Organisateurs',
        data: Array.isArray(graph) ? graph.map(item => item.organizer) : [],
        borderColor: '#f59e0b',
        tension: 0.4,
      },
    ],
  };

  const pieData = {
    labels: [t('Users'), t('Accommodations'), t('Universities'),t('Event')],
    datasets: [
      {
        data: [60, 25, 15,10],
        backgroundColor: ['#1e3a8a', '#bae6fd', '#93c5fd', '#4033a0']
      },
    ],
  };

  const mapMarkers: { name: string; position: LatLngTuple }[] = [
    { name: "Université d'Antananarivo", position: [-18.905, 47.525] },
    { name: "Université de Fianarantsoa", position: [-21.455, 47.085] },
    { name: "Université de Toamasina", position: [-18.149, 49.402] },
  ];

  const studentMarkers: { name: string; position: LatLngTuple; info: string }[] = [
    { name: "Jean Dupont", position: [-18.895, 47.523], info: "Étudiant en Informatique" },
    { name: "Alice Martin", position: [-18.903, 47.535], info: "Étudiante en Génie Logiciel" },
    { name: "Rene Razafindranazy", position: [-18.925, 47.515], info: "Étudiant en Réseaux Informatiques" },
  ];

  const {theme} = useTheme();
  console.log(theme);

  return (
    <motion.div className="p-8 bg-card-primary min-h-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <motion.div className="mb-8 flex justify-between items-center" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-3xl font-bold text-sky-900"></h1>
        <div className="flex items-center gap-4">
          <span className="text-sky-900 font-medium">Admin</span>
          <span className="text-sm text-sky-700">Admin Général</span>
        </div>
      </motion.div>

      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
        {mainStats.map((stat, idx) => (
          <motion.div key={idx} className={`rounded-xl p-6 shadow ${stat.color}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: idx * 0.1 }}>
            <div className="flex justify-between items-center mb-2">{stat.icon}</div>
            <p className="text-sm text-card-foreground">{stat.title}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs ext-card-foreground">{stat.change}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <motion.div className="col-span-2 bg-white dark:bg-card p-6 rounded-xl shadow" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <h2 className="text-lg font-semibold text-primary-foreground mb-4">{t('evolutionRegistrations')}</h2>
          <Line data={graph} />
        </motion.div>
        <motion.div className="bg-white dark:bg-card p-6 rounded-xl shadow" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <h2 className="text-lg font-semibold text-primary-foreground mb-4">{t('Distribution')}</h2>
          <Pie data={pieData} />
        </motion.div>
      </motion.div>

      <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <motion.div className="bg-white dark:bg-card p-6 rounded-xl shadow" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <h2 className="text-lg font-semibold text-primary-foreground mb-4">{t('universitiesMap')}</h2>
          <MapContainer center={[-18.8792, 47.5079] as LatLngTuple} zoom={6} style={{ height: "300px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {mapMarkers.map((marker, idx) => (
              <Marker key={idx} position={marker.position}>
                <Popup>{marker.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </motion.div>

        <motion.div className="bg-white dark:bg-card p-6 rounded-xl shadow" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <h2 className="text-lg font-semibold text-primary-foreground mb-4">{t('HousingMap')}</h2>
          <MapContainer center={[-18.8792, 47.5079] as LatLngTuple} zoom={6} style={{ height: "300px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {studentMarkers.map((student, idx) => (
              <Marker key={idx} position={student.position}>
                <Popup>
                  <strong>{student.name}</strong><br />
                  {student.info}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}


