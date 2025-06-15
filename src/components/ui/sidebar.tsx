"use client";

import React from "react";
import { Home, Users, Building, GraduationCap, FileText, BarChart } from "lucide-react";
import { HiUserAdd } from 'react-icons/hi';
import Link from "next/link";
import {useTranslations} from 'next-intl';

function Sidebar() {

  const t = useTranslations("Sidebar");

  return (
    <div className="w-64 h-screen sticky top-0 bg-card-primary text-gray-900 shadow-xl rounded-2xl p-5 flex flex-col transition duration-300">

      <div className="flex items-center space-x-2 mb-6">
        <span className="text-indigo-600 text-3xl font-bold">
          <GraduationCap size={35}/>
        </span>
        <span className="text-lg font-semibold dark:text-white">
          Student<span className="text-blue-600">Map</span>
        </span>
      </div>
      <nav className="space-y-3">
        {[
          { icon: Home, text: t("dashboard"),link:"/admin/dashboard" },
          { icon: Users, text: t("users") ,link:"/admin/user" },
          { icon: Building, text: t("accommodations"),link:"/admin/accommodation" },
          { icon: GraduationCap, text: t("universities") ,link:"/admin/university"},  
          { icon: FileText, text: t("event") , link:"/admin/event" },
          { icon: FileText, text: t("Messages") , link:"" },
          { icon: HiUserAdd, text: t("addAdmin"),link:'/admin/register' },
        ].map((item, index) => (
          <Link 
            key={index}
            href={item.link??"#"}
            className="flex items-center space-x-3 p-3 rounded-xl transition duration-300 hover:bg-gray-100 hover:text-gray-900 text-foreground dark:hover:bg-neutral-900 dark:hover:text-zinc-50"
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

