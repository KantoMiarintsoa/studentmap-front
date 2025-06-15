"use client"
import { getListUniversities, searchAdvanceduniversity } from '@/service/api';
import { University } from '@/types/university';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SaveUniversity from './saveUniversity';
import { useTranslations } from 'next-intl';

function ListUniversity() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUniversity, setSelectedUniversity] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchName, setSearchName] = useState('');
  const [searchAddress, setSearchAddress] = useState('');

  const router = useRouter();
  const t = useTranslations("UniversityPage");

  function handleUniversityCreated(university: University) {
    setUniversities([...universities, university]);
  }

  const fetchFilteredUniversities = async () => {
    try {
      setLoading(true);
      if (
        searchName.trim() === '' &&
        searchAddress.trim() === '' &&
        (selectedType === 'all' || selectedType === '')
      ) {
        const data = await getListUniversities();
        setUniversities(data);
        console.log(data)
      } else {
        const data = await searchAdvanceduniversity({
          name: searchName.trim(),
           address: searchAddress.trim(),
          type: selectedType !== 'all' ? selectedType : undefined,
        });
        setUniversities(data);
      }
    } catch (err) {
      setError("Erreur lors du filtrage.");
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredUniversities();
  }, [searchName, searchAddress, selectedType]);

  const handleRowClick = (id: number) => {
    router.push(`/admin/university/${id}`);
  };

  return (
    <div className="p-4 w-full flex-1">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Nom"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="border border-blue-300 rounded-md px-4 py-2"
          />
          <input
            type="text"
            placeholder="Adresse"
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
            className="border border-blue-300 rounded-md px-4 py-2"
          />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border border-blue-300 text-blue-700 text-sm rounded-lg px-4 py-2"
          >
            <option value="all">Tous les types</option>
            <option value="PUBLIC">{t("modalAddUniversity.type.public")}</option>
            <option value="PRIVE">{t("modalAddUniversity.type.private")}</option>
          </select>
        </div>
        <SaveUniversity onUniversityCreated={handleUniversityCreated} />
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
                <th className="py-2 px-4 w-1/4">{t("tableColumn.name")}</th>
                <th className="py-2 px-4 w-1/4">{t("tableColumn.address")}</th>
                <th className="py-2 px-4 w-1/4">{t("tableColumn.type")}</th>
                <th className="py-2 px-4 w-1/4">{t("tableColumn.webSite")}</th>
              </tr>
            </thead>
            <tbody>
              {universities.length > 0 ? (
                universities.map((university) => (
                  <tr
                    key={university.id}
                    className={`dark:hover:bg-gray-700 cursor-pointer ${selectedUniversity === university.id ? 'bg-gray-200' : ''}`}
                    onClick={() => handleRowClick(university.id)}
                  >
                    <td className="py-2 px-4 border-b-0">{university.name}</td>
                    <td className="py-2 px-4 border-b-0">{university.address}</td>
                    <td className="py-2 px-4 border-b-0">{university.type}</td>
                    <td className="py-2 px-4 border-b-0">
                      <a
                        href={university.webSite}
                        target="_blank"
                        className="text-blue-500 hover:underline"
                      >
                        {university.webSite}
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    Aucune université trouvée.
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

export default ListUniversity;

