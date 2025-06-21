import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { LogOut } from 'lucide-react';
import { createNote } from '@/api/auxNotes';

interface HeaderProps {
  onNoteCreated?: () => void;
}

export function Header({ onNoteCreated }: HeaderProps) {
  const { userName, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState('');
  const [info, setInfo] = useState('');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createNote(name, info);
      setName('');
      setInfo('');
      setShowForm(false);

      if (onNoteCreated) onNoteCreated();

    } catch (err) {
        throw new Error('Error al crear las notas');
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-700 text-white relative">
      <h1 className="text-2xl font-bold">Bienvenido a tus Notas</h1>

      <div className="flex items-center gap-4 ml-auto">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
        >
          Nueva Nota
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center text-white"
          >
            {userName?.[0]?.toUpperCase() || 'U'}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-md shadow-lg z-50">
              <div className="p-3 border-b border-gray-600">
                <p className="text-sm font-medium">{userName}</p>
              </div>
              <ul>
                <li
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                  className="flex items-center px-4 py-2 hover:bg-gray-600 cursor-pointer border-gray-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar sesión
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <div className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 bg-gray-800 border border-gray-600 rounded-lg shadow-lg p-4 w-full max-w-md z-50">
          <h2 className="text-lg font-semibold mb-2">Crear nueva nota</h2>
          <form onSubmit={handleCreateNote}>
            <input
              type="text"
              placeholder="Título"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white border border-gray-500"
            />
            <textarea
              placeholder="Contenido"
              required
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white border border-gray-500 resize-none h-96 overflow-y-auto"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
              >
                Crear
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
