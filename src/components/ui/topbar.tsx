"use client";
import { useTheme } from "next-themes";
import { Bell, ChevronDown, FileText, Globe, Printer } from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { pageTitles } from "@/const";
import { exportPdf, logout } from "@/service/api";
import { changeLocaleAction } from "../action";
import { useLocale, useTranslations } from "next-intl";
import { FaFileExport } from "react-icons/fa";

function TopBar() {
  const { theme, setTheme } = useTheme();
  
  const locale = useLocale();
  const [language, setLanguage] = useState(()=>{
    const localeLanguageMap = [
      {key:"en", language:"English"},
      {key:"fr", language:"Français"}
    ];

    const current = localeLanguageMap.find((l)=>l.key===locale);

    return current?.language??"Français";
  });
  const [showDropDown, setShowDropDown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  // const[title,setTitle]=useState("Tableau bord")

  const dropdownRef = useRef<HTMLDivElement |null>(null);
  const profileRef = useRef<HTMLDivElement |null>(null);
  const router=useRouter()
  const pathname = usePathname();
  const t=useTranslations("Sidebar")

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

  const handleLogout=async()=>{
    await logout()
    router.push("/login")
  }

  const title = useMemo(()=>{
    return  pageTitles.find(page=>page.pathname===pathname)?.text??"title"
  }, [pathname])

  const changeLocale = async (locale:string)=>{
    await changeLocaleAction(locale);

  } 


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
  
  const handleExportPDF = async () => {
  try {
    const response = await exportPdf();

    // Si le backend renvoie le PDF sous forme de blob
    const blob = new Blob([response.data], { type: "application/pdf" });

    // Crée un lien de téléchargement
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "rapport.pdf"; // nom du fichier
    document.body.appendChild(link);
    link.click();

    // Nettoyage
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Erreur lors de l'export du PDF :", error);
  }
};


  return (
    <div className="flex items-center justify-between px-6 py-3 bg-card-primary sticky top-0 z-50 shadow-sm ">
      <div className="text-lg font-bold dark:text-indigo-400">{t(title)}</div>

      <div className="flex items-center space-x-4">
        <button>
          <Printer/>
        </button>
        <button onClick={handleExportPDF} className="p-2 bg-transparent cursor-pointer hover:text-indigo-500 transition">
          <FaFileExport size={20}/>
          
        </button>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 bg-transparent cursor-pointer"
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropDown(!showDropDown)}
            className="flex items-center p-2 bg-transparent cursor-pointer"
          >
            <Globe size={18} className="mr-1" />
            {language}
            <ChevronDown size={16} className="ml-1" />
          </button>
          {showDropDown && (
            <div className="absolute right-0 mt-2 w-32 dark:bg-card-modal shadow-md rounded-md z-[10000] cursor-pointer">
              <button
                onClick={() => {
                  setLanguage("Français");
                  setShowDropDown(false);
                  changeLocale("fr");
                }}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
              >
                Français
              </button>
              <button
                onClick={() => {
                  setLanguage("English");
                  setShowDropDown(false);
                  changeLocale("en");
                }}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer  "
              >
                English
              </button>
            </div>
          )}
        </div>

        <button className="p-2 bg-transparent">
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
            <div className="absolute right-0 mt-2 w-40 dark:bg-card-modal shadow-md rounded-md z-[10000]">
              <a href="/users" className="block w-full px-4 py-2 text-left hover:bg-zinc-700">Profil</a>
              <button onClick={handleLogout}
              className="block w-full px-4 py-2 text-left hover:bg-zinc-700">
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






