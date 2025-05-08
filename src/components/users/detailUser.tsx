"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserData } from '@/types/user';
import { deleteUser, detailsUser } from '@/service/api';

function DetailUser({ id }: { id: number }) {
  const [user, setUser] = useState<UserData>();
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const data = await detailsUser(id);
      if (!data) {
        setError("L'utilisateur n'existe pas.");
      } else {
        setUser(data);
      }
    };
    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteUser(id);
      setSuccessMsg("Utilisateur supprimé avec succès.");
      setShowConfirmation(false);
      setTimeout(() => {
        router.push('/admin/user');
      }, 2000);
    } catch (err) {
      setError("Erreur lors de la suppression de l'utilisateur.");
    }
  };

  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!user) return <p className="text-center text-gray-500">Chargement...</p>;

  return (
    <div className="relative p-6 bg-white rounded-lg border-4 border-gray-300 shadow-lg max-w-4xl mx-auto mt-8">
      {successMsg && (
        <div className="absolute top-4 left-4 flex items-center space-x-2 px-4 py-2 bg-green-100 border border-green-400 text-green-800 rounded-md shadow-md transition-transform animate-slide-in">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{successMsg}</span>
        </div>
      )}

      <h2 className="text-3xl font-semibold text-blue-800 mb-6 text-center">
        {user.firstName} {user.lastName}
      </h2>

      <div className="space-y-4">
        <p><span className="font-semibold">Nom:</span> {user.lastName}</p>
        <p><span className="font-semibold">Prénom:</span> {user.firstName}</p>
        <p><span className="font-semibold">Email:</span> {user.email}</p>
        <p><span className="font-semibold">Contact:</span> {user.contact}</p>
        <p><span className="font-semibold">Rôle:</span> {user.role}</p>
        {user.profilePicture && (
          <div>
            <span className="font-semibold">Photo de profil:</span>
            <img src={user.profilePicture} alt="Profil" className="w-32 h-32 object-cover rounded-full mt-2" />
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setShowConfirmation(true)}
          className="px-6 py-2 text-red-600 border-2 border-red-600 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-md"
        >
          Supprimer
        </button>
      </div>

      {showConfirmation && (
  <div className="fixed inset-0  bg-opacity-30 flex justify-end items-center pr-6 z-50">
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
    </div>
  );
}
export default DetailUser;

