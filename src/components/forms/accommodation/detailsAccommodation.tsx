import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Accommodation } from '@/types/accommodation';
import { detailsAccommodation, deleteAccommodation, updateAccommodation } from '@/service/api';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FaTimes, FaHome } from 'react-icons/fa';
import { addAccommodationFormData, addAccommodationSchema } from '../schema/addAccommodationSchema';
import { zodResolver } from '@hookform/resolvers/zod';

function DetailAccommodation({ id }: { id: number }) {
    const [accommodation, setAccommodation] = useState<Accommodation>();
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const router = useRouter();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<addAccommodationFormData>({
        resolver: zodResolver(addAccommodationSchema)
    });

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await detailsAccommodation(id);
                if (!data) {
                    setError("Le logement n'existe pas.");
                } else {
                    setAccommodation(data);
                    Object.entries(data).forEach(([key, value]) => {
                        // @ts-ignore
                        setValue(key, value);
                    });
                }
            } catch (err) {
                console.error(err);
                setError("Erreur lors du chargement du logement.");
            }
        };
        fetchDetails();
    }, [id, setValue]);

    const handleDelete = async () => {
        try {
            await deleteAccommodation(id);
            setShowConfirmation(false);
            setSuccessMessage("Logement supprimé avec succès.");
            setTimeout(() => {
                router.push('/admin/accommodation');
            }, 2000);
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
            setError("Erreur lors de la suppression du logement.");
        }
    };

    const handleUpdate = async (data: addAccommodationFormData) => {
        console.log("Formulaire soumis :", data);
        const accommodationUpdated = await updateAccommodation(id, data);
        setAccommodation(accommodationUpdated);
        setShowModal(false);
        setSuccessMessage("Modification enregistrée.");
        setTimeout(() => setSuccessMessage(null), 3000);
    };

    if (!accommodation) return <p className="text-center text-gray-600 font-semibold">Chargement...</p>;

    return (
        <div className="p-8 bg-white rounded-lg border-4 border-gray-300 shadow-xl max-w-4xl mx-auto mt-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">{accommodation.name}</h2>

            {error && (
                <div className="mt-4 mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
                    {error}
                </div>
            )}

            <div className="space-y-6">
                <p className="text-lg"><strong>Nom:</strong> {accommodation.name}</p>
                <p className="text-lg"><strong>Adresse:</strong> {accommodation.address}</p>
                <p className="text-lg"><strong>Superficie:</strong> {accommodation.area} m²</p>
                <p className="text-lg"><strong>Capacité:</strong> {accommodation.receptionCapacity}</p>
                <p className="text-lg"><strong>Disponible:</strong> {accommodation.IsAvailable ? 'Oui' : 'Non'}</p>
                <p className="text-lg"><strong>Loyer:</strong> {accommodation.rentMin} - {accommodation.rentMax}</p>
                <p className="text-lg"><strong>Type:</strong> {accommodation.type}</p>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
                <button
                    className="px-6 py-2 text-blue-700 border-2 border-blue-700 rounded hover:bg-blue-100 cursor-pointer"
                    onClick={() => setShowModal(true)}
                >
                    Éditer
                </button>
                <button
                    className="px-6 py-2 text-red-700 border-2 border-red-700 rounded hover:bg-red-100 cursor-pointer"
                    onClick={() => setShowConfirmation(true)}
                >
                    Supprimer
                </button>
            </div>

            {showConfirmation && (
                <div className="fixed inset-0 z-50 flex items-center justify-end p-6">
                    <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-xs border border-orange-500">
                        <h3 className="text-sm font-semibold text-center mt-2">Supprimer le logement ?</h3>
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

            {successMessage && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-green-500 text-white font-semibold rounded shadow-lg">
                    {successMessage}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-[#000000c4] z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative"
                    >
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes size={20} />
                        </button>

                        <h2 className="text-xl font-semibold mb-4 text-center flex items-center justify-center gap-2">
                            <FaHome className="text-blue-500" /> Modifier le logement
                        </h2>

                        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
                            <div>
                                <label className="block mb-1">Nom</label>
                                <input {...register("name")} type="text" className="w-full border p-2 rounded-md" />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div>

                            <div>
                                <label className="block mb-1">Adresse</label>
                                <input {...register("address")} type="text" className="w-full border p-2 rounded-md" />
                            </div>

                            <div>
                                <label className="block mb-1">Surface (m²)</label>
                                <input {...register("area", { valueAsNumber: true })} type="number" className="w-full border p-2 rounded-md" />
                            </div>

                            <div>
                                <label className="block mb-1">Capacité d'accueil</label>
                                <input {...register("receptionCapacity")} type="text" className="w-full border p-2 rounded-md" />
                            </div>

                            <div>
                                <label className="block mb-1">Loyer min</label>
                                <input {...register("rentMin", { valueAsNumber: true })} type="number" className="w-full border p-2 rounded-md" />
                            </div>

                            <div>
                                <label className="block mb-1">Loyer max</label>
                                <input {...register("rentMax", { valueAsNumber: true })} type="number" className="w-full border p-2 rounded-md" />
                            </div>

                            <div>
                                <label className="block mb-1">Type</label>
                                <select {...register("type")} className='w-full border p-2 rounded-md'>
                                    <option value="">Sélectionner le type</option>
                                    <option value="BUNGALOW">Bungalow</option>
                                    <option value="APARTEMENT">Appartement</option>
                                    <option value="DORTOIRE">Dortoir</option>
                                    <option value="GUEST">Guest</option>
                                </select>
                                {errors.type && <p className='text-red-500 text-sm'>{errors.type.message}</p>}
                            </div>

                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Sauvegarder
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                >
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

export default DetailAccommodation;
