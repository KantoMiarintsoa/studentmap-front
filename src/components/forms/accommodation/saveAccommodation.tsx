"use client"
import React, { useEffect, useState } from 'react'
import { FaPlus, FaTimes, FaHome } from 'react-icons/fa';
import { motion } from "framer-motion";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addAccommodation, getOwnerLIst } from '@/service/api';
import { addAccommodationFormData, addAccommodationSchema } from '../schema/addAccommodationSchema';
import { User } from '@/types/user';

type Owner = {
  id: string;
  name: string;
};

function SaveAccommodation() {
  const [isOpen, setIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [owners, setOwners] = useState<User[]>([]);


  const toggleModal = () => setIsOpen(!isOpen);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<addAccommodationFormData>({
    resolver: zodResolver(addAccommodationSchema)
  });

  useEffect(() => {
    async function loadOwners() {
        const data = await getOwnerLIst();
        console.log(data);
        setOwners(data)
    }

    loadOwners();
  },[]);

  async function onSubmit(data: addAccommodationFormData) {
    await addAccommodation(data);
    console.log(data);
    setSuccessMessage("Logement ajouté avec succès !");
    reset();
    toggleModal();
    setTimeout(() => setSuccessMessage(""), 5000);
  }

  return (
    <>
      <button onClick={toggleModal} className="flex items-center gap-2 bg-transparent text-blue-500 border border-blue-500 px-4 py-2 rounded-lg shadow-md hover:bg-blue-100 transition-all">
        🏠 Ajouter Logement <FaPlus />
      </button>

      {successMessage && (
        <div className="mt-4 px-4 py-2 bg-green-100 text-green-800 border border-green-300 rounded-md shadow-sm">
          {successMessage}
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#000000c4] z-50">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <button onClick={toggleModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <FaTimes size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center flex items-center justify-center gap-2">
              <FaHome className="text-blue-500" /> Ajouter un logement
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block mb-1">Nom du logement</label>
                <input {...register("name")} type="text" className="w-full border p-2 rounded-md" />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block mb-1">Adresse</label>
                <input {...register("address")} type="text" className="w-full border p-2 rounded-md" />
                {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
              </div>

              <div>
                <label className="block mb-1">Surface (m²)</label>
                <input {...register("area", { valueAsNumber: true })} type="number" step="0.01" className="w-full border p-2 rounded-md" />
                {errors.area && <p className="text-red-500 text-sm">{errors.area.message}</p>}
              </div>

              <div>
                <label className="block mb-1">Capacité d'accueil</label>
                <input {...register("receptionCapacity")} type="text" className="w-full border p-2 rounded-md" />
                {errors.receptionCapacity && <p className="text-red-500 text-sm">{errors.receptionCapacity.message}</p>}
              </div>

              <div>
                <label className="block mb-1">Loyer minimum</label>
                <input {...register("rentMin", { valueAsNumber: true })} type="number" step="0.01" className="w-full border p-2 rounded-md" />
                {errors.rentMin && <p className="text-red-500 text-sm">{errors.rentMin.message}</p>}
              </div>

              <div>
                <label className="block mb-1">Loyer maximum</label>
                <input {...register("rentMax", { valueAsNumber: true })} type="number" step="0.01" className="w-full border p-2 rounded-md" />
                {errors.rentMax && <p className="text-red-500 text-sm">{errors.rentMax.message}</p>}
              </div>

              <div>
                <label className="block mb-1">Devise</label>
                <input {...register("currency")} type="text" placeholder="ex: Ar, €" className="w-full border p-2 rounded-md" />
                {errors.currency && <p className="text-red-500 text-sm">{errors.currency.message}</p>}
              </div>

              <div>
                <label className="block mb-1">Type de logement</label>
                <select {...register("type")} className="w-full border p-2 rounded-md">
                  <option value="">Sélectionner le type</option>
                  <option value="STUDIO">Studio</option>
                  <option value="APARTEMENT">Appartement</option>
                  <option value="VILLA">Villa</option>
                  <option value="GUEST">Guest</option>
                </select>
                {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
              </div>

              <div>
                <label className="block mb-1">Propriétaire</label>
                <select {...register("ownerId", {valueAsNumber:true})} className="w-full border p-2 rounded-md">
                  <option value="">Sélectionner un propriétaire</option>
                  {owners.map((owner) => (
                    <option key={owner.id} value={owner.id}>
                      {owner.lastName}
                    </option>
                  ))}
                </select>
                {errors.ownerId && <p className="text-red-500 text-sm">{errors.ownerId.message}</p>}
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button onClick={toggleModal} type="button" className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition">Annuler</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition cursor-pointer">Enregistrer</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default SaveAccommodation;
