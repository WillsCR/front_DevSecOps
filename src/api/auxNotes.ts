const BACKEND_IP = import.meta.env.VITE_BACKEND_IP;

export interface Appointment {
  _id: string;
  name: string;
  date: string;
  info: string;
  userid: string;
}

export async function getNotesByUserId(): Promise<Appointment[]> {
    const backurl: string = BACKEND_IP+"/appointments/getByUserId";
    const token = localStorage.getItem('accessToken');
    console.log(token);
    const res = await fetch(backurl, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!res.ok) {
        throw new Error('Error en la conexión');
    }
    
    return await res.json();
}

export async function createNote(name: string, info: string): Promise<Appointment> {
    const backurl: string = BACKEND_IP+"/appointments/createAppointment";
    const token = localStorage.getItem('accessToken');

    const res = await fetch(backurl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name, info }),
    });
    if (!res.ok) {
        throw new Error('Error en la conexión');
    }
    
    return await res.json();
}

export async function deleteNote(id: string): Promise<Appointment> {
    const backurl: string = BACKEND_IP+`/appointments/deleteAppointment/${id}`;
    const token = localStorage.getItem('accessToken');

    const res = await fetch(backurl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    if (!res.ok) {
        throw new Error('Error en la conexión');
    }
    
    return await res.json();
}

export async function updateNote(id: string, name: string, info: string): Promise<Appointment> {
    const backurl: string = BACKEND_IP+`/appointments/updateAppointment/${id}`;
    const token = localStorage.getItem('accessToken');

    const res = await fetch(backurl, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name, info }),
    });
    if (!res.ok) {
        throw new Error('Error en la conexión');
    }
    
    return await res.json();
}