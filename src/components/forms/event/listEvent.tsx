"use client";
import { getListEvent } from '@/service/api';
import { Event } from '@/types/event';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import SaveEvent from './saveEvent';
import DetailsEvent from './detailsEvent';

function ListEvent() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);  
    const [eventToEdit, setEventToEdit] = useState<Event | null>(null);

    const router = useRouter();

    function handleEventCreated(event: Event) {
        setEvents([...events, event]);
    }

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getListEvent();
                setEvents(data);    
            } catch (error) {
                setError('Erreur de chargement des événements.');
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleRowClick = (id: number) => {
        setSelectedEvent(id);
        router.push(`/admin/event/${id}`);
    };

    const handleEdit = (id: number) => {
        const event = events.find((e) => e.id === id);
        if (event) {
            setEventToEdit(event);
            setIsModalOpen(true); 
        }
    };

    const handleDelete = (id: number) => {
        const confirmDelete = confirm("Voulez-vous vraiment supprimer cet événement ?");
        if (confirmDelete) {
            alert(`Événement ${id} supprimé`);
        }
    };

    const toggleMenu = (id: number) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };

    return (
        <div className="p-4 w-full flex-1">
            <div className="flex justify-end mb-6">
                <SaveEvent onEventCreated={handleEventCreated} />
            </div>

            {/* <DetailsEvent
                event={eventToEdit}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            /> */}

            {loading ? (
                <p className="text-center text-gray-500">Chargement...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full table-fixed bg-white border border-gray-200 shadow-lg rounded-md">
                        <thead className="bg-gray-100">
                            <tr className="text-left border-b">
                                <th className="py-2 px-4 w-1/5">Nom</th>
                                <th className="py-2 px-4 w-1/5">Localisation</th>
                                <th className="py-2 px-4 w-1/5">Inscription</th>
                                <th className="py-2 px-4 w-1/5">Date de début</th>
                                <th className="py-2 px-4 w-1/5 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.length > 0 ? (
                                events.map((event) => (
                                    <tr
                                        key={event.id}
                                        onClick={() => handleRowClick(event.id)}
                                        className={`cursor-pointer hover:bg-gray-50 ${selectedEvent === event.id ? 'bg-gray-200' : ''}`}
                                    >
                                        <td className="py-2 px-4">{event.name}</td>
                                        <td className="py-2 px-4">{event.location}</td>
                                        <td className="py-2 px-4">
                                            <span className={event.registration_available ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                                                {event.registration_available ? 'Oui' : 'Non'}
                                            </span>
                                        </td>
                                        <td className="py-2 px-4">{new Date(event.startDate).toLocaleDateString()}</td>
                                        <td className="py-2 px-4 text-center relative">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleMenu(event.id);
                                                }}
                                                className="text-gray-600 hover:text-black focus:outline-none text-xl cursor-pointer"
                                            >
                                                ⋮
                                            </button>
                                            {openMenuId === event.id && (
                                                <div
                                                    ref={menuRef}
                                                    className="absolute right-4 top-8 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                                                >
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleEdit(event.id);
                                                        }}
                                                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-t-lg"
                                                    >
                                                        ✏️ Éditer
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDelete(event.id);
                                                        }}
                                                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600 rounded-b-lg"
                                                    >
                                                        🗑 Supprimer
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-4 text-gray-500">
                                        Aucun événement trouvé.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ListEvent;
