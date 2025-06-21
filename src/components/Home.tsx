import { useEffect, useState } from "react";
import { Trash2, Pencil } from 'lucide-react';
import { Header } from "./Header";
import { getNotesByUserId, deleteNote, updateNote } from "@/api/auxNotes";
import type { Appointment } from "@/api/auxNotes";

export default function Home() {
  const [notes, setNotes] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNote, setEditingNote] = useState<Appointment | null>(null);
  const [editName, setEditName] = useState('');
  const [editInfo, setEditInfo] = useState('');

  const handleDelete = async (id: string) => {
  if (!confirm("¿Estás seguro de que deseas eliminar esta nota?")) return;
    try {
      await deleteNote(id);
      await fetchNotes();
    } catch (_err) {
      console.error("Error al eliminar nota");
    }
  };

  const handleEdit = (note: Appointment) => {
    setEditingNote(note);
    setEditName(note.name);
    setEditInfo(note.info);
  };

  const handleUpdateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNote) return;

    try {
      await updateNote(editingNote._id, editingNote.name, editInfo);
      setEditingNote(null);
      setEditName('');
      setEditInfo('');
      fetchNotes();
    } catch (_err) {
      console.error('Error al actualizar la nota');
    }
  };

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const data = await getNotesByUserId();
      setNotes(data);
    } catch (_err) {
      console.error("Error al obtener notas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-800">
      <div className="flex flex-1 flex-col text-white">
        <Header onNoteCreated={fetchNotes} />

        <div className="px-6 py-4">
          {loading ? (
            <div className="my-2">
              <div className="bg-gray-700 text-white px-6 py-4 rounded-lg shadow-md w-fit">
                Cargando notas...
              </div>
            </div>
          ) : notes.length === 0 ? (
            <div className="my-2">
              <div className="bg-gray-700 text-white px-6 py-4 rounded-lg shadow-md w-fit">
                No hay notas disponibles.
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-4">
              {notes.map((note) => (
                <div
                  key={note._id}
                  className="relative bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 transition-all h-48 w-full max-w-sm flex flex-col justify-between overflow-hidden"
                >

                  <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        onClick={() => handleEdit(note)}
                        className="text-green-400 hover:text-green-600"
                        title="Editar nota"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(note._id)}
                        className="text-red-400 hover:text-red-600"
                        title="Eliminar nota"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  <div>
                    <h2 className="text-lg font-semibold truncate">{note.name}</h2>
                    <p className="text-sm mt-2 line-clamp-4 overflow-y-auto">{note.info}</p>
                  </div>
                  <p className="text-xs mt-2">Fecha: {new Date(note.date).toLocaleString('es-CL')}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        {editingNote && (
          <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-start pt-20 z-50">
            <div className="bg-gray-800 border border-gray-600 rounded-lg shadow-lg p-4 w-full max-w-md">
              <h2 className="text-lg font-semibold mb-2">Editar nota</h2>
              <form onSubmit={handleUpdateNote}>
                <p className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white border border-gray-500">
                  {editName}
                </p>
                <textarea
                  placeholder="Contenido"
                  required
                  value={editInfo}
                  onChange={(e) => setEditInfo(e.target.value)}
                  className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white border border-gray-500 resize-none h-96 overflow-y-auto"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingNote(null)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
