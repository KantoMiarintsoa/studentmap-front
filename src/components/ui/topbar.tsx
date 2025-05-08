"use client";
import { useTheme } from "next-themes";
import { Bell, ChevronDown, Globe } from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { pageTitles } from "@/const";

function TopBar() {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState("Français");
  const [showDropDown, setShowDropDown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  // const[title,setTitle]=useState("Tableau bord")

  const dropdownRef = useRef<HTMLDivElement |null>(null);
  const profileRef = useRef<HTMLDivElement |null>(null);
  const router=useRouter()
  const pathname = usePathname();

  // useEffect(() => {
  //   switch (pathname) {
  //     case "/admin/dashboard":
  //       setTitle("Tableau de bord");
  //       break;
  //     case "/admin/user":
  //       setTitle("Utilisateurs");
  //       break;
  //     case "/admin/accommodation":
  //       setTitle("Logements");
  //       break;
  //     case "/admin/university":
  //       setTitle("Université");
  //       break;
  //     case "/admin/event":
  //       setTitle("Événements");
  //       break;
  //     default:
  //       setTitle("Tableau de bord");
  //       break;
  //   }
  // }, [pathname]); 

  const title = useMemo(()=>{
    return pageTitles.find(page=>page.pathname===pathname)?.text??"StudentMap"
  }, [pathname])


  useEffect(() => {
    function handleClickOutside(event:MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropDown(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white sticky top-0 z-50 shadow-sm ">
      <div className="text-lg font-bold dark:text-indigo-400">{title}</div>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 bg-transparent"
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropDown(!showDropDown)}
            className="flex items-center p-2 bg-transparent"
          >
            <Globe size={18} className="mr-1" />
            {language}
            <ChevronDown size={16} className="ml-1" />
          </button>
          {showDropDown && (
            <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md z-[10000]">
              <button
                onClick={() => {
                  setLanguage("Français");
                  setShowDropDown(false);
                }}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Français
              </button>
              <button
                onClick={() => {
                  setLanguage("English");
                  setShowDropDown(false);
                }}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                English
              </button>
            </div>
          )}
        </div>

        <button className="p-2 bg-white">
          <Bell size={20} />
        </button>

        <div className="relative" ref={profileRef}>
          <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="cursor-pointer">
            <Image
              src={require("@/assets/profile.jpg")}
              alt="profile"
              className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600"
            />
          </button>
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md z-[10000]">
              <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                Profil
              </button>
              <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                Se Déconnecter
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopBar;





