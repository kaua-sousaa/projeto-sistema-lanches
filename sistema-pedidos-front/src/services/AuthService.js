import { fetchWithAuth } from '../services/ApiClient';

const API_BASE_URL = 'http://localhost:8080'; 
export const loginUsuario = async (credentials) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const responseData = await response.json().catch(() => null);

        if (!response.ok) {
            throw new Error(responseData?.message || `Erro ${response.status}: Falha na autenticação.`);
        }

        return responseData;
    } catch (error) {
        console.error("Erro no serviço de loginUsuario:", error);
        throw error;
    }
}

export const verificarSessao = async () => {
    try {
        const response = await fetchWithAuth('/auth/me', {
            method: 'GET',
        });

        if (response.status === 204) {
            return null;
        }

        const responseData = await response.json().catch(() => null);

        if (!response.ok) {
            throw new Error(responseData?.message || `Erro ${response.status} ao verificar sessão.`);
        }

        return responseData;
    } catch (error) {
        console.error("Erro no serviço de verificarSessao:", error);
        throw error;
    }
}