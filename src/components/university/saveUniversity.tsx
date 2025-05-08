"use client"
import { addUniversities, editUniversity } from '@/service/api';
import React, { useEffect, useState } from 'react'
import { FaPlus, FaTimes, FaUniversity } from 'react-icons/fa';
import { motion } from "framer-motion";
import { useForm } from 'react-hook-form';
import { addUniversitiesShema, addUniversityFormData } from '../forms/schema/addUniversity.shema';
import { zodResolver } from '@hookform/resolvers/zod';
import { University } from '@/types/university';


type SaveUniversityProps = {
  onUniversityCreated: (university:University) => void;
  selectedUniversity?:University
};

function SaveUniversity({selectedUniversity,onUniversityCreated}:SaveUniversityProps) {  
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(!isOpen);
    const [mentions, setMentions] = useState<string[]>(selectedUniversity?selectedUniversity.mention:[]);
    const [customMention, setCustomMention] = useState("");
    const [showCustomInput, setShowCustomInput] = useState(false);
    const[successMessage,setSuccessMessage]=useState("")
    const [errorMessage, setErrorMessage] = useState("");



    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm<addUniversityFormData>({
        resolver: zodResolver(addUniversitiesShema)
    });

    useEffect(()=>{
        setValue("mention", mentions);
    }, [mentions])

    async function onSubmit(data: addUniversityFormData) {
        try {
          if (selectedUniversity) {
            await editUniversity(selectedUniversity.id, data);
            setSuccessMessage("Université mise à jour avec succès");
          } else {
            await addUniversities(data);
            setSuccessMessage("Université ajoutée avec succès");
          }
    
          reset();
          setMentions([]);
          toggleModal();
          setErrorMessage(""); 
    
          setTimeout(() => setSuccessMessage(""), 5000);
        } catch (error: any) {
          setSuccessMessage("");
    
          if (error?.response?.status === 409) {
            setErrorMessage("L'adresse saisie existe déjà.");
          } else {
            setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
          }
    
          setTimeout(() => setErrorMessage(""), 5000); 
        }
      }

    const addMention = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedMention = event.target.value;
        if (selectedMention === "other") {
            setShowCustomInput(true);
        } else if (selectedMention && !mentions.includes(selectedMention)) {
            setMentions([...mentions, selectedMention]);
        }
    };

    const addCustomMention = () => {
        if (customMention.trim() && !mentions.includes(customMention.trim())) {
            setMentions([...mentions, customMention.trim()]);
            setCustomMention("");
            setShowCustomInput(false);
        }
    };

    const removeMention = (mentionToRemove: string) => {
        setMentions(mentions.filter(mention => mention !== mentionToRemove));
    };
    

    return (
        <>

            {selectedUniversity?(
                <button onClick={toggleModal}
                // onClick={handleEdit}
                className="px-6 py-2 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md"
            >
                Modifier
            </button>
            ):(
                <button onClick={toggleModal} className="flex items-center gap-2 bg-transparent text-blue-500 border border-blue-500 px-4 py-2 rounded-lg shadow-md hover:bg-blue-100 transition-all ">
                🎓 Ajouter Université <FaPlus />
                    </button>
            )}

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-[#000000c4]">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                        <button onClick={toggleModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                            <FaTimes size={20} />
                        </button>

                        <h2 className="text-xl font-semibold mb-4 text-center flex items-center justify-center gap-2">
                            <FaUniversity className="text-blue-500" /> {selectedUniversity?"Mise a jour":"Ajout Univeriste"}
                        </h2>
                            {successMessage && (
                            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-md mb-4 text-center">
                                {successMessage}
                            </div>
                            )}
                            {errorMessage && (
                            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md mb-4 text-center">
                                {errorMessage}
                            </div>
                            )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <input {...register("name")} type="text" placeholder="Nom de l'université" className="w-full border p-2 rounded-md" defaultValue={selectedUniversity?.name}/>
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                            <textarea {...register("description")} placeholder="Description" className="w-full border p-2 rounded-md" defaultValue={selectedUniversity?.description} />
                            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

                            <input {...register("city")} type="text" placeholder="Ville" className="w-full border p-2 rounded-md" defaultValue={selectedUniversity?.city} />
                            {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}

                            <input {...register("webSite")} type="text" placeholder="Site web" className="w-full border p-2 rounded-md"  defaultValue={selectedUniversity?.webSite}/>
                            {errors.webSite && <p className="text-red-500 text-sm">{errors.webSite.message}</p>}

                            <input {...register("address")} type="text" placeholder="Adresse" className="w-full border p-2 rounded-md" defaultValue={selectedUniversity?.address} />
                            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}


                            <select onChange={addMention} className="w-full border p-2 rounded-md">
                                <option value="">Sélectionner une mention</option>
                                <option value="science">Informatique</option>
                                <option value="arts">Gestion</option>
                                <option value="commerce">communication</option>
                                <option value="other">Autre</option>
                            </select>

                            <div className="flex flex-wrap gap-2 mt-2">
                                {mentions.map((mention, index) => (
                                    <div key={index} className="flex items-center bg-gray-200 p-2 rounded-md">
                                        <span>{mention}</span>
                                        <button type="button" onClick={() => removeMention(mention)} className="ml-2 text-red-500 hover:text-red-700">❌</button>
                                    </div>
                                ))}
                            </div>

                            {showCustomInput && (
                                <div className="flex items-center gap-2 mt-2">
                                    <input type="text" placeholder="Nouvelle mention" value={customMention} onChange={(e) => setCustomMention(e.target.value)} className="w-full border p-2 rounded-md" />
                                    <button type="button" onClick={addCustomMention} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">Ajouter</button>
                                </div>
                            )}

                            <select {...register("type")} className="w-full border p-2 rounded-md" defaultValue={selectedUniversity?.type}>
                                <option value="">Sélectionner le type</option>
                                <option value="public">Public</option>
                                <option value="prive">Privé</option>
                            </select>
                            {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}

                            <div className="flex justify-end gap-4 mt-6">
                                <button onClick={toggleModal} type="button" className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition">Annuler</button>
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">{selectedUniversity? "Mis a jour":"Enregistrer"}</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </>
    );
}
export default SaveUniversity;