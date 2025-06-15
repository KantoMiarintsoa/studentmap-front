
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import bureau from "@/assets/bureau.jpg";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  FaUserShield,
  FaMapMarkerAlt,
  FaBan,
  FaLock,
  FaUserSecret,
} from "react-icons/fa";

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, []);

  return scrollDirection;
}

const CampusMap = () => {
  const position: [number, number] = [48.8566, 2.3522];

  return (
    <div className="w-full h-96 relative mt-8 shadow-xl rounded-xl overflow-hidden">
      <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={position}>
          <Popup>Bienvenue sur le campus!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

const rules = [
  {
    text: "Les étudiants doivent utiliser leur identifiant académique pour accéder aux fonctionnalités.",
    icon: <FaUserShield size={40} className="text-blue-600" />,
  },
  {
    text: "La géolocalisation est uniquement utilisée dans le cadre du suivi pédagogique.",
    icon: <FaMapMarkerAlt size={40} className="text-green-600" />,
  },
  {
    text: "Toute tentative de fraude entraînera une suspension du compte.",
    icon: <FaBan size={40} className="text-red-600" />,
  },
  {
    text: "Les données collectées sont sécurisées et ne sont pas partagées avec des tiers sans consentement.",
    icon: <FaLock size={40} className="text-purple-600" />,
  },
  {
    text: "Le respect de la vie privée et des règles d’éthique numérique est primordial.",
    icon: <FaUserSecret size={40} className="text-yellow-600" />,
  },
];

function HomeAdmin() {
  const scrollDirection = useScrollDirection();

  return (
    <div className="bg-gray-50 font-sans overflow-auto relative">
      <motion.header
        className="relative h-[500px] w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0">
          <Image
            src={bureau}
            alt="Fond administration"
            layout="fill"
            objectFit="cover"
            className="opacity-90"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute top-6 right-6 z-20">
          <a href="/login" className="px-5 py-2 bg-transparent text-white font-medium rounded-full hover:opacity-80 transition border border-white">Se connecter</a>
        </div>
        <div className="relative text-center text-white z-10 pt-24">
          <motion.h1
            className="text-4xl md:text-6xl font-bold"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Bienvenue sur StudentMap
          </motion.h1>
          <motion.p
            className="mt-4 text-lg"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            Plateforme intelligente pour les etudiants
          </motion.p>
        </div>
      </motion.header>

      <motion.section className="text-center py-20 bg-white">
        <motion.h2
          className="text-3xl font-bold mb-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Vos données en un coup d'œil
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          {[ 
            { value: "10 000+", label: "Étudiants suivis" },
            { value: "1 200", label: "logemnts" },
            { value: "98%", label: "Suivi en temps réel" },
            { value: "60+", label: "Évenements" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="p-6 bg-gray-100 rounded-xl shadow-xl w-52"
              initial={{ opacity: 0, y: 50 }}
              animate={scrollDirection === "down" ? { opacity: 1, y: 0 } : { opacity: 1, y: -50 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <p className="text-2xl font-bold text-blue-800">{item.value}</p>
              <p className="mt-2 text-gray-700">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section className="py-20 px-4 md:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Règlement de l'application</h2>
        <div className="space-y-12">
          {rules.map((rule, i) => (
            <motion.div
              key={i}
              className={`flex flex-col md:flex-row items-center gap-6 md:items-start ${
                i % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex-shrink-0">
                <div className="bg-blue-100 p-3 rounded-full">{rule.icon}</div>
              </div>
              <div className="flex-1 bg-blue-50 rounded-xl shadow-lg p-6 md:p-6 w-full max-w-md">
                <p className="text-gray-700 text-base">{rule.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section className="relative py-20 bg-gray-50">
        <motion.h2
          className="text-3xl font-semibold text-center mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Explorez le campus avec StudentMap
        </motion.h2>
        <CampusMap />
      </motion.section>

      <motion.footer
        className="bg-gray-800 text-white text-center py-12 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-sm text-left max-w-6xl mx-auto">
          <div>
            <h4 className="text-lg font-semibold mb-3">StudentMap</h4>
            <p>
              Plateforme de gestion académique intelligente, dédiée au suivi en temps réel, à la cartographie des étudiants
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Ressources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-400">Centre d’aide</a></li>
              <li><a href="#" className="hover:text-gray-400">Documentation API</a></li>
              <li><a href="#" className="hover:text-gray-400">Blog pédagogique</a></li>
              <li><a href="#" className="hover:text-gray-400">Tutoriels vidéo</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Légal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-400">Conditions d’utilisation</a></li>
              <li><a href="#" className="hover:text-gray-400">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:text-gray-400">Mentions légales</a></li>
              <li><a href="#" className="hover:text-gray-400">Accessibilité</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6">
          <p className="text-sm text-gray-400">© 2025 StudentMap. Tous droits réservés.</p>
        </div>
      </motion.footer>
    </div>
  );
}

export default HomeAdmin;
