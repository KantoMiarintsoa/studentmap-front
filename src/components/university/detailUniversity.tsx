import { deleteUniversity, detailUniversity } from '@/service/api';
import { University } from '@/types/university';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SaveUniversity from './saveUniversity';

function DetailUniversity({ id }: { id: number }) {
  const [detailsUniversity, setDetailsUniversity] = useState<University | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getDetailsUniversity = async () => {
      try {
        const data = await detailUniversity(id);
        if (!data) {
          setError("L'université n'existe pas.");
        } else {
          setDetailsUniversity(data);
          console.log(data);
        }
      } catch (err) {
        setError("Université n'existe pas");
        console.error(err);
      }
    };
    getDetailsUniversity();
  }, [id]);

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!detailsUniversity) {
    return <p className="text-center text-gray-500">Chargement...</p>;
  }

  const handleDelete = async () => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette université ?");
    if (confirmed) {
      try {
        await deleteUniversity(id);
        console.log( "Université supprimée avec succès.");
        alert("L'université a été supprimée avec succès.");
        router.push("/admin/university");
      } catch (error) {
        console.error("Erreur lors de la suppression de l'université", error);
        alert("Une erreur est survenue lors de la suppression de l'université.");
      }
    }
  };

  const handleUpdate = () => {
    setSuccessMessage("Université mise à jour avec succès !");
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <div className="p-6 bg-white rounded-lg border-4 border-gray-300 shadow-lg max-w-4xl mx-auto mt-8">
      <h2 className="text-3xl font-semibold text-gray-900 mb-4">{detailsUniversity.name}</h2>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg border border-green-400 shadow">
          {successMessage}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg border border-green-400 shadow">
          {successMessage}
        </div>
      )}

      <div className="space-y-4">
        <p className="text-gray-700">
          <span className="font-semibold">Nom:</span> {detailsUniversity.name}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Description:</span> {detailsUniversity.description}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Type:</span> {detailsUniversity.type}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Website:</span>
          <a
            href={detailsUniversity.webSite}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {detailsUniversity.webSite}
          </a>
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Mention:</span> {detailsUniversity.mention.join(", ")}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Ville:</span> {detailsUniversity.city}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Adresse:</span> {detailsUniversity.address}
        </p>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <SaveUniversity
          selectedUniversity={detailsUniversity}
          onUniversityCreated={handleUpdate}
        />
        <button
          onClick={handleDelete}
          className="px-6 py-2 text-red-600 border-2 border-red-600 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 shadow-md"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}

export default DetailUniversity;
