const BACKEND_IP = import.meta.env.VITE_BACKEND_IP;

export type RegisterResponse = {
    userName: string;
    grades: string[];
    id: string;
};

export async function register(userName: string, password: string): Promise<RegisterResponse> {
    const backurl: string = BACKEND_IP+"/user/createUser";
    const res = await fetch(backurl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password }),
    });
    if (res.status != 201) {
        throw new Error('Register failed');
    }
    
    return res.json();
}