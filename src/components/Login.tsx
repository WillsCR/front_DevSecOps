import { useState } from "react";
import type { FormEvent } from 'react';
import { useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { login } from "@/api/auxLogin";


export default function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const { checkAuth } = useAuth();

    const mutation = useMutation({
        mutationFn: () => login(userName, password),
        onSuccess: (data) => {
            localStorage.setItem('accessToken', data.token);
            checkAuth();
            navigate('/home');
        },
        onError: (_err) => {
            setErrorMessage('Usuario y/o Contraseña incorrecta');
        },
    });

    const LoginForm = (evento: FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        mutation.mutate();
    };

    
    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-800">
                <div className="w-full p-6 max-w-sm rounded-2xl shadow-lg bg-gray-950">
                    <h1 className="text-center text-lg mb-2 font-bold text-white">Inicio de Sesión</h1>

                    <form onSubmit={LoginForm}>
                        {errorMessage && (
                            <div className="mb-4 text-sm text-center text-white bg-red-600 px-3 py-2 rounded-2xl">
                                {errorMessage}
                            </div>
                        )}
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm mb-1 text-gray-300">Usuario:</label>
                            <input 
                            id="username"
                            type="text" 
                            placeholder="username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-400 rounded text-white" 
                            />
                        </div>
                        <div className="mb-4 relative">
                            <label htmlFor="password" className="block text-sm mb-1 text-gray-300">Contraseña:</label>
                            <input
                            id="password"
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
                            Login
                        </button>
                        <p className="text-sm mt-4 text-gray-500">
                            ¿No estas registrado? <a href="/register" className="text-blue-500 hover:text-blue-600">Registrarse</a>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};