import { User } from '@/types/user'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserUpdateFormData, userUpdateSchema } from '../forms/schema/updateUser.shema';
import { editUser } from '@/service/api';
import { motion } from "framer-motion";
import { FaTimes, FaUserEdit } from 'react-icons/fa';

function UpdateUser({selectedUser}:{selectedUser:User}) {
    const[isOpen,setIsOpen]=useState(false);
    const toggleModal=()=>setIsOpen(!isOpen);
    const [selectedRoles, setSelectedRoles] = useState<string[]>(selectedUser ?selectedUser.role:);
    const[successMessage,setSuccessMessage]=useState("")
    const{
        register,
        handleSubmit,
        formState:{errors},
        reset,
        setValue,
    }=useForm<UserUpdateFormData>({
        resolver:zodResolver(userUpdateSchema)
    });
    useEffect(()=>{
        if(selectedUser){
            setValue("email",selectedUser.email);
            setValue("firstName",selectedUser.firstName);
            setValue("lastName",selectedUser.lastName);
            setValue("oldPassword","");
            setValue("newPassword","");
            const validRoles: ("STUDENT" | "ADMIN" | "PROPRIETAIRE" | "ORGANISATEUR")[] = Array.isArray(selectedUser.role)? selectedUser.role.filter((role) =>["STUDENT", "ADMIN", "PROPRIETAIRE", "ORGANISATEUR"].includes(role)) as ("STUDENT" | "ADMIN" | "PROPRIETAIRE" | "ORGANISATEUR")[]: [];setValue("roles", validRoles);
            setValue("contact","");
            setValue("profilePicture","")
        }
    },[selectedUser,setValue])

async function onSubmit(data:UserUpdateFormData){
    await editUser(selectedUser.id,data);
    setSuccessMessage("Utilisateur mis à jour avec succès");
    reset();
    toggleModal();
    setTimeout(()=>setSuccessMessage(""),5000)
}

  return (
    <>
            <button onClick={toggleModal} className="px-6 py-2 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md">
                Modifier
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-[#000000c4]">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                        <button onClick={toggleModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                            <FaTimes size={20} />
                        </button>

                        <h2 className="text-xl font-semibold mb-4 text-center flex items-center justify-center gap-2">
                            <FaUserEdit className="text-blue-500" /> Mise à jour de l'utilisateur
                        </h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <input {...register("email")} type="email" placeholder="Email" className="w-full border p-2 rounded-md" disabled />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                            <input {...register("firstName")} type="text" placeholder="Prénom" className="w-full border p-2 rounded-md" />
                            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}

                            <input {...register("lastName")} type="text" placeholder="Nom" className="w-full border p-2 rounded-md" />
                            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}

                            <input {...register("contact")} type="text" placeholder="Contact" className="w-full border p-2 rounded-md" />
                            {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}

                            <input {...register("profilePicture")} type="text" placeholder="URL de la photo de profil" className="w-full border p-2 rounded-md" />
                            {errors.profilePicture && <p className="text-red-500 text-sm">{errors.profilePicture.message}</p>}

                            <select {...register("roles")} className="w-full border p-2 rounded-md" multiple>
                                <option value="ADMIN">Admin</option>
                                <option value="USER">Etudiant</option>
                                <option value="MODERATOR">Proprietaire</option>
                            </select>
                            {errors.roles && <p className="text-red-500 text-sm">{errors.roles.message}</p>}

                            <input {...register("oldPassword")} type="password" placeholder="Ancien mot de passe (optionnel)" className="w-full border p-2 rounded-md" />
                            {errors.oldPassword && <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>}

                            <input {...register("newPassword")} type="password" placeholder="Nouveau mot de passe (optionnel)" className="w-full border p-2 rounded-md" />
                            {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}


                            <div className="flex justify-end gap-4 mt-6">
                                <button onClick={toggleModal} type="button" className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition">Annuler</button>
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">Mettre à jour</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </>
  )
}

export default UpdateUser

