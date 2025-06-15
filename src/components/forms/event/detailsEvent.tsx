'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Event } from '@/types/event';
import { deleteEvent, detailsEvents, updateEvent } from '@/service/api';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';

function DetailEvent({ id }: { id: number }) {
  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const t=useTranslations("Event")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const fetchEvent = async () => {
      const data = await detailsEvents(id);
      console.log(data)
      if (!data) {
        setError("L'événement n'existe pas.");
      } else {
        setEvent(data);
        reset({
          name: data.name,
          description: data.description,
          location: data.location,
          startDate: data.startDate,
          endDate: data.endDate,
          capacity: data.capacity,
          registration_link: data.registration_link,
        });
      }
    };

    fetchEvent();
  }, [id, reset]);

  const handleDelete = async () => {
    try {
      await deleteEvent(id);
      setSuccessMessage("Événement supprimé avec succès.");
      setShowConfirmation(false);
      setTimeout(() => router.push('/admin/event'), 2000);
    } catch (err) {
      setError("Erreur lors de la suppression.");
    }
  };

  const onSubmit = async (data: any) => {
      const updated = await updateEvent(id,data);
      setEvent(updated);
      setSuccessMessage("Événement mis à jour avec succès.");
      setShowModal(false);

    
  };

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!event) return <p className="text-center text-gray-500">Chargement...</p>;

  return (
    <div className="p-6 dark:bg-card-modal rounded-lg border-4 border-gray-300 shadow-lg max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center">{event.name}</h2>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg border border-green-400 shadow">
          {successMessage}
        </div>
      )}

      <div className="space-y-3">
        <p><span className="font-semibold">{t("listsEvent.name")}:</span> {event.name}</p>
        <p><span className="font-semibold">{t("detailsEvent.description")}:</span> {event.description}</p>
        <p><span className="font-semibold">{t("listsEvent.StartDate")}:</span> {new Date(event.startDate).toLocaleString()}</p>
        <p><span className="font-semibold">{t("detailsEvent.endDate")}:</span> {new Date(event.endDate).toLocaleString()}</p>
        <p><span className="font-semibold">{t("detailsEvent.createdAt")}:</span> {new Date(event.created_at).toLocaleString()}</p>
        <p><span className="font-semibold">{t("detailsEvent.updatedAt")}:</span> {new Date(event.updated_at).toLocaleString()}</p>
        <p><span className="font-semibold">{t("listsEvent.localisation")}:</span> {event.location || 'Non spécifié'}</p>
        <p><span className="font-semibold">{t("detailsEvent.capacity")}:</span> {event.capacity || 'Non définie'}</p>
        <p><span className="font-semibold">{t("listsEvent.inscription")}:</span> {event.registration_available ? 'Oui' : 'Non'}</p>
        {event.registration_link && (
          <p>
            <span className="font-semibold">{t("detailsEvent.inscriptionLink")}:</span>
            <a href={event.registration_link} target="_blank" className="text-blue-500 hover:underline ml-2">Lien</a>
          </p>
        )}
        {event.image && (
          <img src={event.image} alt="Image de l'événement" className="w-full max-h-64 object-cover rounded-md mt-2" />
        )}
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 cursor-pointer"
        >
          {t("detailsEvent.edit")}
        </button>
        <button
          onClick={() => setShowConfirmation(true)}
          className="px-6 py-2 text-red-600 border-2 border-red-600 rounded-lg hover:bg-red-50 cursor-pointer"
        >
          {t("detailsEvent.remove")}
        </button>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-xs border border-orange-500">
            <h3 className="text-sm font-semibold text-center mt-2">Supprimer l'événement ?</h3>
            <div className="mt-4 flex justify-start gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-1 bg-transparent border border-blue-300 text-blue-600 rounded hover:bg-blue-50"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-1 bg-transparent border border-red-500 text-red-500 rounded hover:bg-red-50"
              >
                Oui, supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#000000c4] z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="dark:bg-card-modal rounded-lg shadow-lg w-full max-w-lg p-6 relative"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">Modifier l'événement</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block mb-1">Nom</label>
                <input {...register("name", { required: "Ce champ est requis" })} type="text" className="w-full border p-2 rounded-md" />
                {errors.name?.message && (
                  <p className="text-red-500 text-sm">{String(errors.name.message)}</p>
                )}
              </div>

              <div>
                <label className="block mb-1">Description</label>
                <textarea {...register("description")} className="w-full border p-2 rounded-md" />
              </div>

              <div>
                <label className="block mb-1">Lieu</label>
                <input {...register("location")} type="text" className="w-full border p-2 rounded-md" />
              </div>

              <div>
                <label className="block mb-1">Date de début</label>
                <input {...register("startDate")} type="text" className="w-full border p-2 rounded-md" />
              </div>

              <div>
                <label className="block mb-1">Date de fin</label>
                <input {...register("endDate")} type="text" className="w-full border p-2 rounded-md" />
              </div>

              <div>
                <label className="block mb-1">Capacité</label>
                <input {...register("capacity",{valueAsNumber:true})} type="number" className="w-full border p-2 rounded-md" />
              </div>

              <div>
                <label className="block mb-1">Lien d'inscription</label>
                <input {...register("registration_link")} type="url" className="w-full border p-2 rounded-md" />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Sauvegarder
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
                  Annuler
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default DetailEvent;
