const Login : React.FC = ()=>{
     return (
        <div className="min-h-screen bg-blue-300 flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md pb-16">
                <h1 className="text-2xl font-bold text-center mb-14">Inicia Sesión</h1>

                <input
                className="bg-gray-200 border-2 px-4 py-2 rounded-sm mb-4 w-full"
                type="text"
                placeholder="Escribe tu nombre"
                />

                <input
                className="bg-gray-200 border-2 px-4 py-2 rounded-sm w-full mb-4"
                type="password"
                placeholder="Escribe tu contraseña"
                />

                <div className="flex justify-center">
                    <button className="active:font-extrabold active:scale-95 bg-blue-400 px-4 py-2 rounded-sm text-white text-lg font-semibold hover:bg-blue-600"
                    >
                        Entrar al sitio
                    </button>
                </div>
            </div>
        </div>
  );
}

export default Login;