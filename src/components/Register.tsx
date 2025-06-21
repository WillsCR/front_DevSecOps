import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { register } from '@/api/auxRegister';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const mutation = useMutation({
            mutationFn: () => register(username, password),
            onSuccess: (_data) => {
                navigate('/');
            },
            onError: (_err) => {
                alert('Register failed');
            },
        });

    const RegisterForm = async (evento: FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        mutation.mutate();
    }

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-800">
                <div className="w-full p-6 max-w-sm rounded-2xl shadow-lg bg-gray-950">
                    <h1 className="text-center text-lg mb-2 font-bold text-white">Registrarse</h1>

                    <form onSubmit={RegisterForm}>
                        <div className="mb-4">
                            <label className="block text-sm mb-1 text-gray-300">Usuario:</label>
                            <input
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-400 rounded text-white"
                            required
                            />
                        </div>

                        <div className="mb-4 relative">
                            <label className="block text-sm mb-1 text-gray-300">Contraseña:</label>
                            <input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-400 rounded text-white"
                            required
                            />
                        </div>
                        
                        <button
                        type="submit"
                        className="w-full py-2 rounded bg-gradient-to-r bg-gray-600 hover:bg-gray-700 text-white"
                        >
                            Registrarse
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
};