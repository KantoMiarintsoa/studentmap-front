"use client";
import React, { useEffect, useState } from "react";
import { FaPlus, FaTimes, FaHome, FaCamera } from "react-icons/fa";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addAccommodation, getOwnerLIst } from "@/service/api";
import {
  addAccommodationFormData,
  addAccommodationSchema,
} from "../schema/addAccommodationSchema";
import { User } from "@/types/user";
import { useTranslations } from "next-intl";

function SaveAccommodation() {
  const [isOpen, setIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [owners, setOwners] = useState<User[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const t = useTranslations("Accommodation");

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles([...selectedFiles, ...files]);

      const previews = files.map((file) => URL.createObjectURL(file));
      setPreviewImages([...previewImages, ...previews]);
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setErrorMessage("");
    setSuccessMessage("");
    setSelectedFiles([]);
    setPreviewImages([]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<addAccommodationFormData>({
    resolver: zodResolver(addAccommodationSchema),
  });

  useEffect(() => {
    async function loadOwners() {
      const data = await getOwnerLIst();
      setOwners(data);
    }
    loadOwners();
  }, []);

  async function onSubmit(formData: addAccommodationFormData) {
    const dataToSend = {
      ...formData,
      media: { images: selectedFiles },
    };

    try {
      await addAccommodation(dataToSend);
      setSuccessMessage("Logement ajouté avec succès !");
      setErrorMessage("");
      reset();
      // setSelectedFiles([]);
      // setPreviewImages([]);

      setTimeout(() => {
        setSuccessMessage("");
        toggleModal();
      }, 2000);
    } catch (error: any) {
      console.error(error);
      if (
        error?.response?.data?.message?.toLowerCase().includes("adresse")
      ) {
        setErrorMessage("Adresse déjà existante.");
      } else {
        setErrorMessage("Adresse déjà existante.");
      }
    }
  }

  return (
    <>
      <button
        onClick={toggleModal}
        className="flex items-center gap-2 bg-transparent text-blue-500 border border-blue-500 px-4 py-2 rounded-lg shadow-md hover:bg-blue-100 transition-all"
      >
        {t("SaveAccommodation.addAccommodation")} <FaPlus />
      </button>

      {successMessage && !isOpen && (
        <div className="mt-4 px-4 py-2 bg-green-100 text-green-800 border border-green-300 rounded-md shadow-sm">
          {successMessage}
        </div>
      )}

      {errorMessage && !isOpen && (
        <div className="mt-4 px-4 py-2 bg-red-100 text-red-800 border border-red-300 rounded-md shadow-sm">
          {errorMessage}
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#000000c4] z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card-modal rounded-lg shadow-lg w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center flex items-center justify-center gap-2">
              <FaHome className="text-blue-500" /> Ajouter un logement
            </h2>

            {successMessage && (
              <div className="mb-4 px-4 py-2 bg-green-100 text-green-800 border border-green-300 rounded-md shadow-sm text-center">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="mb-4 px-4 py-2 bg-red-100 text-red-800 border border-red-300 rounded-md shadow-sm text-center">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  {...register("media")}
                  onChange={onFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <div className="flex justify-center">
                  <button  type="button" 
                    onClick={() => document.getElementById("file-upload")?.click()}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition cursor-pointer"
                    title="Ajouter une photo">
                          <FaCamera className="text-xl"/>
                </button>
                </div>
                

                {errors.media?.message && typeof errors.media.message === "string" && (
                  <p className="text-red-500 text-sm">{errors.media.message}</p>
                )}
              </div>

              {previewImages.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {previewImages.map((src, index) => (
                    <div key={index} className="relative w-20 h-20 rounded-xl border overflow-hidden">
                      <img
                      key={index}
                      src={src}
                      alt={`preview-${index}`}
                      className="w-full h-full object-cover"
                    />
                    <button type="button" onClick={()=>{
                        setSelectedFiles(files=>files.filter((_,i)=>i !==index));
                        setPreviewImages(previews=>previews.filter((_,i)=>i !==index))
                    }}
                      className="absolute top-0 right-0 bg-slate-700 text-white rounded-bl-md px-1 text-xs font-bold cursor-pointer select-none" aria-label="annuler cet image"
                      >
                        <FaTimes size={12}/>
                    </button>

                    </div>
                  ))}
                </div>
              )}

              <div>
                <label className="block mb-1">Nom du logement</label>
                <input
                  {...register("name")}
                  type="text"
                  className="w-full border p-2 rounded-lg"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>
              
              <div>
                <label className="block mb-1">description</label>
                <input
                  {...register("description")}
                  type="text"
                  className="w-full border p-2 rounded-lg"
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
              </div>

              <div>
                <label className="block mb-1">Adresse</label>
                <input
                  {...register("address")}
                  type="text"
                  placeholder="Ex: Lot 12, Quartier Ambatomena, Antananarivo"
                  className="w-full border p-2 rounded-lg"
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
              </div>

              <div>
                <label className="block mb-1">Surface (m²)</label>
                <input
                  {...register("area", { valueAsNumber: true })}
                  type="number"
                  step="0.01"
                  className="w-full border p-2 rounded-md"
                />
                {errors.area && <p className="text-red-500 text-sm">{errors.area.message}</p>}
              </div>

              <div>
                <label className="block mb-1">Capacité d'accueil</label>
                <input
                  {...register("receptionCapacity")}
                  type="text"
                  className="w-full border p-2 rounded-lg"
                />
                {errors.receptionCapacity && (
                  <p className="text-red-500 text-sm">{errors.receptionCapacity.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-1">Loyer minimum</label>
                <input
                  {...register("rentMin", { valueAsNumber: true })}
                  type="number"
                  step="0.01"
                  className="w-full border p-2 rounded-lg"
                />
                {errors.rentMin && <p className="text-red-500 text-sm">{errors.rentMin.message}</p>}
              </div>

              <div>
                <label className="block mb-1">Loyer maximum</label>
                <input
                  {...register("rentMax", { valueAsNumber: true })}
                  type="number"
                  step="0.01"
                  className="w-full border p-2 rounded-lg"
                />
                {errors.rentMax && <p className="text-red-500 text-sm">{errors.rentMax.message}</p>}
              </div>

              {/* <div>
                <label className="block mb-1">Devise</label>
                <input
                  {...register("currency")}
                  type="text"
                  placeholder="ex: Ar, €"
                  className="w-full border p-2 rounded-lg"
                />
                {errors.currency && <p className="text-red-500 text-sm">{errors.currency.message}</p>}
              </div> */}

              <div>
                <label className="block mb-1">Type de logement</label>
                <select {...register("type")} className="w-full border p-2 rounded-lg">
                  <option value="" className="dark:bg-card-modal">Sélectionner le type</option>
                  <option value="BUNGALOW" className="dark:bg-card-modal">Bungalow</option>
                  <option value="APARTEMENT" className="dark:bg-card-modal">Appartement</option>
                  <option value="DORTOIR" className="dark:bg-card-modal">Dortoir</option>
                  <option value="GUEST" className="dark:bg-card-modal">Guest</option>
                </select>
                {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
              </div>

              <div>
                <label className="block mb-1">Propriétaire</label>
                <select
                  {...register("ownerId", { valueAsNumber: true })}
                  className="w-full border p-2 rounded-lg"
                >
                  <option value="" className="dark:bg-card-modal">Sélectionner un propriétaire</option>
                  {owners.map((owner) => (
                    <option key={owner.id} value={owner.id} className="dark:bg-card-modal">
                      {owner.lastName}
                    </option>
                  ))}
                </select>
                {errors.ownerId && <p className="text-red-500 text-sm">{errors.ownerId.message}</p>}
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={toggleModal}
                  type="button"
                  className="px-4 py-2 bg-gray-500 rounded-md hover:bg-gray-400 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition cursor-pointer"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default SaveAccommodation;