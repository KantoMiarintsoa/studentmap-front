import React from "react";
import { Home, Users, Building, GraduationCap, FileText, BarChart } from "lucide-react";
import Link from "next/link";

function Sidebar() {
  return (
    <div className="w-64 h-screen sticky top-0 bg-white text-gray-900 shadow-xl rounded-2xl p-5 flex flex-col transition duration-300">

      <div className="flex items-center space-x-2 mb-6">
        <span className="text-indigo-600 text-3xl font-bold">🗺️</span>
        <span className="text-lg font-semibold">
          Student<span className="text-blue-600">Map</span>
        </span>
      </div>
      <nav className="space-y-3">
        {[
          { icon: Home, text: "Tableau de bord",link:"/admin/dashboard" },
          { icon: Users, text: "Utilisateurs" ,link:"/admin/user" },
          { icon: Building, text: "Logements",link:"/admin/accommodation" },
          { icon: GraduationCap, text: "Université" ,link:"/admin/university"},  
          { icon: FileText, text: "Evenements" , link:"/admin/event" },
          { icon: BarChart, text: "Reports" },
        ].map((item, index) => (
          <Link 
            key={index}
            href={item.link??"#"}
            className="flex items-center space-x-3 p-3 rounded-xl transition duration-300 hover:bg-gray-100 hover:text-gray-900"
          >
            <item.icon size={22} />
            <span className="font-medium">{item.text}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;

