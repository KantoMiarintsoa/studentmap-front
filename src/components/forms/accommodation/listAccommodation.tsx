"use client";
import { Accommodation } from "@/types/accommodation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SaveAccommodation from "./saveAccommodation";
import { getListAccommodations } from "@/service/api";
import { useTranslations } from "next-intl";
import { FiSearch } from "react-icons/fi";

function ListAccommodation() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtres
  const [filterName, setFilterName] = useState("");
  const [filterAddress, setFilterAddress] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterBudget, setFilterBudget] = useState("");
  const [filterAvailable, setFilterAvailable] = useState("all");

  const router = useRouter();
  const t = useTranslations("Accommodation");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getListAccommodations();
        setAccommodations(data);
      } catch (e) {
        setError("Erreur lors du chargement des logements.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRowClick = (id: number) => {
    router.push(`/admin/accommodation/${id}`);
  };

  const uniqueTypes = Array.from(new Set(accommodations.map((acc) => acc.type)));

  const filteredAccommodations = accommodations.filter((acc) => {
    const matchesName = acc.name.toLowerCase().includes(filterName.toLowerCase());
    const matchesAddress = acc.address.toLowerCase().includes(filterAddress.toLowerCase());
    const matchesType = filterType === "all" || acc.type === filterType;
    const matchesAvailable =
      filterAvailable === "all" ||
      (filterAvailable === "yes" && acc.IsAvailable) ||
      (filterAvailable === "no" && !acc.IsAvailable);
    const matchesBudget =
      !filterBudget || acc.rentMin <= parseFloat(filterBudget);

    return matchesName && matchesAddress && matchesType && matchesAvailable && matchesBudget;
  });

  return (
    <div className="p-4 w-full flex-1">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
        <h2 className="text-xl font-semibold">Liste des logements</h2>
        <SaveAccommodation />
      </div>

      <div className="relative mb-4 w-1/5 shadow-2xs">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
        </span>
        <input
          type="text"
          placeholder="Rechercher par nom"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className="w-full pl-10 border border-blue-300 rounded-lg py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
        />
</div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Filtrer par adresse"
          value={filterAddress}
          onChange={(e) => setFilterAddress(e.target.value)}
          className="w-full md:w-40 border border-blue-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-full md:w-32 border border-blue-300 rounded-lg px-2 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">Tous les types</option>
          {uniqueTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Budget"
          min="0"
          value={filterBudget}
          onChange={(e) => setFilterBudget(e.target.value)}
          className="w-full md:w-28 border border-blue-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />

        <select
          value={filterAvailable}
          onChange={(e) => setFilterAvailable(e.target.value)}
          className="w-full md:w-32 border border-blue-300 rounded-lg px-2 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">Tous</option>
          <option value="yes">Disponible</option>
          <option value="no">Non disponible</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Chargement...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto shadow-lg dark:shadow-[0_0_20px_#686868] rounded-md border border-gray-200 dark:border-stone-100/10 p-2">
          <table className="w-full table-fixed bg-card dark:border-none border border-gray-200 rounded-md">
            <thead className="bg-slate-80">
              <tr className="text-left border-b">
                <th className="py-2 px-4">Nom</th>
                <th className="py-2 px-4">Adresse</th>
                <th className="py-2 px-4">Type</th>
                <th className="py-2 px-4">Disponible</th>
                <th className="py-2 px-4">Loyer min</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccommodations.length > 0 ? (
                filteredAccommodations.map((acc) => (
                  <tr
                    key={acc.id}
                    className="hover:hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleRowClick(acc.id)}
                  >
                    <td className="py-2 px-4">{acc.name}</td>
                    <td className="py-2 px-4">{acc.address}</td>
                    <td className="py-2 px-4">{acc.type}</td>
                    <td className="py-2 px-4">{acc.IsAvailable ? "Oui" : "Non"}</td>
                    <td className="py-2 px-4">{acc.rentMin}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    Aucun logement trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
export default ListAccommodation;