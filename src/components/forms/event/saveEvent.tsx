"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaPlus, FaTimes } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { addEventSchema, EventFormData } from "../schema/addEvent.schema";
import { addEvent } from "@/service/api";
import { Event } from '@/types/event';


type SaveEventProps = {
  onEventCreated: (event:Event) => void;
};

function SaveEvent({onEventCreated}:SaveEventProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const toggleModal = () => setIsOpen(!isOpen);
  const [event,setEvent]=useState("")

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(addEventSchema),
  });

  const onSubmit = async (data: EventFormData) => {
    try {
      const event = await addEvent({
        ...data,
        startDate:(new Date(data.startDate)).toISOString(),
        endDate:(new Date(data.endDate)).toISOString()
      });
      setSuccessMessage("Événement ajouté avec succès !");
      reset();
      setIsOpen(false);
      setTimeout(() => setSuccessMessage(""), 5000);

      onEventCreated(event);

    } catch (error) {
      console.error("Erreur lors de l'ajout de l'événement", error);
    }
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="flex items-center gap-2 bg-transparent text-blue-500 border border-blue-500 px-4 py-2 rounded-lg shadow-md hover:bg-blue-100 transition-all"
      >
        📅 Ajouter Événement <FaPlus />
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#000000c4] z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative"
          >
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center flex items-center justify-center gap-2">
              <FaCalendarAlt className="text-blue-500" />
              Ajouter un événement
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setValue("image", file);
                    }
                  }}
                  className="w-full border p-2 rounded-md"
                />
                    {typeof errors.image?.message === "string" && (
                      <p className="text-red-500 text-sm">{errors.image.message}</p>
                    )}


              <input
                {...register("name")}
                type="text"
                placeholder="Titre de l'événement"
                className="w-full border p-2 rounded-md"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

              <textarea
                {...register("description")}
                placeholder="Description"
                className="w-full border p-2 rounded-md"
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

              <input
                {...register("startDate")}
                type="datetime-local"
                className="w-full border p-2 rounded-md"
              />
              {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}

              <input
                {...register("endDate")}
                type="datetime-local"
                className="w-full border p-2 rounded-md"
              />
              {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}

              <input
                {...register("capacity", {
                  valueAsNumber:true
                })}
                type="number"
                placeholder="Capacité"
                className="w-full border p-2 rounded-md"
              />
              {errors.capacity && <p className="text-red-500 text-sm">{errors.capacity.message}</p>}

              <div>
                <p className="mb-2 font-medium">Inscriptions ouvertes ?</p>
                <div className="flex items-center gap-6">
                  <Controller
                    control={control}
                    name="registration_available"
                    render={({field:{onBlur, onChange, ref, value}})=>(
                      <>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            className="accent-blue-500"
                            ref={ref}
                            checked={value === true}
                            onBlur={onBlur}
                            onChange={()=>onChange(true)}
                          />
                          Oui
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          className="accent-blue-500"
                          ref={ref}
                          checked={value===false}
                          onBlur={onBlur}
                          onChange={()=>onChange(false)}
                        />
                        Non
                      </label>
                      </>
                    )}
                  />
              </div>
          {errors.registration_available && (
            <p className="text-red-500 text-sm">{errors.registration_available.message}</p>
          )}
        </div>

              {errors.registration_available && <p className="text-red-500 text-sm">{errors.registration_available.message}</p>}

              <input
                {...register("registration_link")}
                type="text"
                placeholder="Lien d'inscription"
                className="w-full border p-2 rounded-md"
              />
              {errors.registration_link && <p className="text-red-500 text-sm">{errors.registration_link.message}</p>}

              <input
                {...register("location")}
                type="text"
                placeholder="Lieu"
                className="w-full border p-2 rounded-md"
              />
              {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  ❌ Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {successMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          {successMessage}
        </div>
      )}
    </>
  );
}

export default SaveEvent;




