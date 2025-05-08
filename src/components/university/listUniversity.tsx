"use client"
import { getListUniversities } from '@/service/api';
import { University } from '@/types/university'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import SaveUniversity from './saveUniversity';

function ListUniversity() {
    const[universities,setUniversities]=useState<University[]>([]);
    const [loading,setLoading]=useState(true);
    const[error,setError]=useState<string |null>(null);
    const [selectedUniversity, setSelectedUniversity] = useState<number | null>(null);
    const router=useRouter()

    function handleUniversityCreated(university:University){
      setUniversities([...universities,university])

    }

    useEffect(()=>{
        const fetchUniversities=async()=>{
            const data= await getListUniversities();
            setUniversities(data)
        }
        fetchUniversities()
        setLoading(false)
    },[])

    const handleRowClick=(id:number)=>{
      router.push(`/admin/university/${id}`)
    }

  return (
    <div className="p-4 w-full flex-1">
      <div className='flex justify-end mb-6'>
          <SaveUniversity onUniversityCreated={handleUniversityCreated} />

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
                <th className="py-2 px-4 w-1/4">Nom</th>
                <th className="py-2 px-4 w-1/4">Adresse</th>
                <th className="py-2 px-4 w-1/4">Type</th>
                <th className="py-2 px-4 w-1/4">Site web</th>
              </tr>
            </thead>
            <tbody>
              {universities.length > 0 ? (
                universities.map((university) => (
                  <tr 
                    key={university.id} 
                    className={`hover:bg-gray-50 cursor-pointer ${selectedUniversity === university.id ? 'bg-gray-200' : ''}`}
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
  )
}

export default ListUniversity



