const BACKEND_IP = import.meta.env.VITE_BACKEND_IP;

export type LoginResponse = {
    token: string;
};

export async function login(userName: string, password: string): Promise<LoginResponse> {
    const backurl: string = BACKEND_IP+"/user/validateLogin";
    const res = await fetch(backurl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password }),
    });
    if (!res.ok) {
        throw new Error('Login failed');
    }
    
    return await res.json();
}