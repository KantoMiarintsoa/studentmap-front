"use client";
import { Accommodation } from "@/types/accommodation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SaveAccommodation from "./saveAccommodation";
import { getListAccommodations } from "@/service/api";
import { MoreVertical, Edit2, Trash2 } from "lucide-react";

function ListAccommodation() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAccommodation, setSelectedAccommodation] = useState<number | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const router = useRouter();

  function handleAccommodationCreated(accommodation: Accommodation) {
    setAccommodations([...accommodations, accommodation]);
  }

  const handleDelete = (id: number) => {
    // À remplacer par ta logique de suppression
    alert(`Supprimer logement avec ID ${id}`);
  };

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const data = await getListAccommodations();
        setAccommodations(data);
      } catch (e) {
        setError("Erreur lors du chargement des logements.");
      } finally {
        setLoading(false);
      }
    };
    fetchAccommodations();
  }, []);

  const handleRowClick = (id: number) => {
    router.push(`/admin/accommodation/${id}`);
  };

  return (
    <div className="p-4 w-full flex-1">
      <div className="flex justify-end mb-6">
        <SaveAccommodation />
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Chargement...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-fixed bg-white border border-gray-200 shadow-lg rounded-md">
            <thead className="bg-gray-100">
              <tr className="text-left border-b">
                <th className="py-2 px-4 w-1/5">Nom</th>
                <th className="py-2 px-4 w-1/5">Adresse</th>
                <th className="py-2 px-4 w-1/5">Type</th>
                <th className="py-2 px-4 w-1/5">Disponible</th>
                <th className="py-2 px-4 w-1/5">Action</th>
              </tr>
            </thead>
            <tbody>
              {accommodations.length > 0 ? (
                accommodations.map((acc) => (
                  <tr
                    key={acc.id}
                    className={`hover:bg-gray-50 ${selectedAccommodation === acc.id ? "bg-gray-200" : ""}`}
                    onClick={() => handleRowClick(acc.id)}
                  >
                    <td className="py-2 px-4 border-b-0">{acc.name}</td>
                    <td className="py-2 px-4 border-b-0">{acc.address}</td>
                    <td className="py-2 px-4 border-b-0">{acc.type}</td>
                    <td className="py-2 px-4 border-b-0">{acc.IsAvailable ? "Oui" : "Non"}</td>
                    <td
                      className="py-2 px-4 border-b-0 relative"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() =>
                          setOpenDropdownId(openDropdownId === acc.id ? null : acc.id)
                        }
                        className="text-gray-600 hover:text-black"
                      >
                        <MoreVertical size={20} />
                      </button>
                      {openDropdownId === acc.id && (
                        <div className="absolute right-2 mt-2 w-32 bg-white border rounded-md shadow-lg z-10">
                          <button
                            onClick={() => router.push(`/admin/accommodation/edit/${acc.id}`)}
                            className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-sm text-left"
                          >
                            <Edit2 size={16} />
                            Éditer
                          </button>
                          <button
                            onClick={() => handleDelete(acc.id)}
                            className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-sm text-left text-red-600"
                          >
                            <Trash2 size={16} />
                            Supprimer
                          </button>
                        </div>
                      )}
                    </td>
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
