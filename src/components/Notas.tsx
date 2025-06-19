import react, { useState, useEffect } from 'react';

type Nota = {
    id: number;
    texto: string;
    };

const Notas: React.FC = () => {
    const [notas, setNotas] = useState<Nota[]>([]);
    const [nuevaNota, setNuevaNota] = useState<string>('');

    const agregarNota = () => {
        if (nuevaNota.trim() === '') return;

        const nueva: Nota = {
            id: Date.now(),
            texto: nuevaNota,
        };

        setNotas([...notas, nueva]);
        setNuevaNota('');
    };

    const eliminarNota = (id: number) => {
        setNotas(notas.filter(nota => nota.id !== id));
    };

    return (
        <div className="min-h-screen bg-blue-100 p-4">
            <h1 className="text-2xl font-bold mb-4">Mis Notas</h1>
            <div className="mb-4">
                <input
                    className="bg-gray-200 -border-2 px-4 py-2 rounded-sm mr-2 2-1/2"
                    type="text"
                    placeholder='Escribe una nota...'
                    value={nuevaNota}
                    onChange={(e) => setNuevaNota(e.target.value)}
                />
                <button
                    className="bg-blue-400 text-white px-4 py-2 rounded-sm hover:bg-blue-600"
                    onClick={agregarNota}
                >
                    Agregar Nota
                </button>

            </div>

            <ul>
                {notas.map(nota => (
                    <li key={nota.id} className="flex justify-between items-center bg-white p-2 rounded-sm shadow mb-2">
                        <span>{nota.texto}</span>
                        <button
                            className="bg-red-400 text-white px-2 py-1 rounded-sm hover:bg-red-600"
                            onClick={() => eliminarNota(nota.id)}
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Notas;