"use client"
import { getListUsers, searchUser } from '@/service/api';
import { User } from '@/types/user'
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import debounce from 'lodash/debounce';
import { FaSearch } from 'react-icons/fa';


function ListUser() {
    const[users,setUsers]=useState<User[]>([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState<string |null>(null);
    const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
    const [search,setSearch]=useState('')
    const [historique,setHistorique]=useState<string[]>([])
    //  const [results, setResults] = useState<User[]>([]);
    const t= useTranslations("UniversityPage")
    const router=useRouter()

    useEffect(()=>{
        const fetchUsers=async()=>{
            try{
                const data=await getListUsers();
                console.log(data)
                setUsers(data)
            }
            catch(err){
                setError("Erreur lors du chargement des utilisateurs")

            }
            finally{
                setLoading(false)
            }
        }
        fetchUsers()
    },[]);

    const handleRowCLick=(id:number)=>{
        router.push(`/admin/user/${id}`)
    }

    const debouncedSearch=useCallback(
        debounce(async(value:string)=>{
            setLoading(true);
            try{
                if(value.trim()===''){
                    const data=await getListUsers();
                    setUsers(data)
                }
                else{
                    const resultats=await searchUser(value);
                    setUsers(resultats)
                }
            }
            catch(error){
                setError("Erreur lors de la recherche")
            }
            finally{
                setLoading(false)
            }
        },300),[]
    )

    const handleSearchChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const value= e.target.value
        setSearch(value);
        debouncedSearch(value)
    }
   
  return (
    <div>
        <div className="p-4 w-full flex-1">
            <div className="relative mb-4 w-1/5 shadow-2xs">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
            type="text"
            placeholder={t("tableColumn.searchUniversity")}
            value={search}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
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
                                <th className="py-2 px-4 w-1/3">{t("tableColumn.name")}</th>
                                <th className="py-2 px-4 w-1/3">{t("tableColumn.email")}</th>
                                <th className="py-2 px-4 w-1/3">{t("tableColumn.contact")}</th>
                                <th className='py-2 px-4 w-1/3'>{t("tableColumn.roles")}</th>

                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr 
                                        key={user.id} 
                                        className="dark:hover:bg-gray-700 cursor-pointer"
                                        onClick={()=>handleRowCLick(user.id)}
                                    >
                                        <td className="py-2 px-4 border-b-0">{user.firstName} {user.lastName}</td>
                                        <td className="py-2 px-4 border-b-0">{user.email}</td>
                                        <td className="py-2 px-4 border-b-0">{user.contact}</td>
                                        <td  className='py-2 px-4 border-b-0'>{user.role}</td>
                                        <td className="py-2 px-4 border-b-0 relative">
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="text-center py-4 text-gray-500">
                                        Aucun utilisateur trouvé.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    </div>
  )
}

export default ListUser




