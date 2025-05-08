"use client"
import { getListUsers } from '@/service/api';
import { User } from '@/types/user'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function ListUser() {
    const[users,setUsers]=useState<User[]>([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState<string |null>(null);
    const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
    const router=useRouter()

    useEffect(()=>{
        const fectchUsers=async()=>{
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
        fectchUsers()
    },[]);

    const handleRowCLick=(id:number)=>{
        router.push(`/admin/user/${id}`)
    }

  return (
    <div>
        <div className="p-4 w-full flex-1">
            {loading ? (
                <p className="text-center text-gray-500">Chargement...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full table-fixed bg-white border border-gray-200 shadow-lg rounded-md">
                        <thead className="bg-gray-100">
                            <tr className="text-left border-b">
                                <th className="py-2 px-4 w-1/3">Nom</th>
                                <th className="py-2 px-4 w-1/3">Email</th>
                                <th className="py-2 px-4 w-1/3">Contact</th>
                                <th className='py-2 px-4 w-1/3'>Role</th>

                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr 
                                        key={user.id} 
                                        className="hover:bg-gray-50 cursor-pointer"
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