import axios from "axios";
const BACKEND_IP = import.meta.env.VITE_BACKEND_IP;

export const auxLogin = async (userName : string, password: string)=>{
    const backurl: string = BACKEND_IP+"/user/validateLogin";
    const jsonData = {
        "userName": userName,
        "password": password,
    }
    try {
        const response = await axios.post(backurl, jsonData);
        if(response.status === 201 && response.data === true){
            return true;
        }
        return false;
        
    } catch (error) {
        return false;
    }
}