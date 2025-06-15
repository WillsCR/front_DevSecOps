import { useState } from "react";
import { auxLogin } from "../api/auxLogin";
import { useNavigate } from "react-router-dom";

function validarDatos(userName : string, password: string){
    if(userName.trim() === "" || password.trim() === ""){
        return false;
    }
    return true;
}

const Login : React.FC = ()=>{
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onLoginClick = async ()=> {
        if(await auxLogin(userName,password)){
            navigate('/home')
        }
    };

     return (
        <div className="min-h-screen bg-blue-300 flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md pb-16">
                <h1 className="text-2xl font-bold text-center mb-14">Inicia Sesión</h1>

                <input
                className="bg-gray-200 border-2 px-4 py-2 rounded-sm mb-4 w-full"
                type="text"
                placeholder="Escribe tu nombre"
                onChange={((e) =>{setUserName(e.target.value);})}
                />

                <input
                className="bg-gray-200 border-2 px-4 py-2 rounded-sm w-full mb-4"
                type="password"
                placeholder="Escribe tu contraseña"
                onChange={((e) =>{setPassword(e.target.value);})}
                />

                <div className="flex justify-center">
                    <button className={`px-4 py-2 rounded-sm text-white text-lg font-semibold 
                      ${validarDatos(userName, password)? "bg-blue-400 active:font-extrabold active:scale-95 hover:bg-blue-600"
                        : "bg-gray-400"}  
                    `}
                        onClick={onLoginClick}
                        disabled={!validarDatos(userName,password)}
                    >
                        Entrar al sitio
                    </button>
                </div>
            </div>
        </div>
  );
}

export default Login;