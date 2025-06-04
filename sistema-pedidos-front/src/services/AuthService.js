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

        const data = await response.json();

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Erro ${response.status} ao fazer login`);
        }

        return data;
    } catch (error) {
        console.error("Erro no serviço de loginUsuario", error);
        throw error;
    }
}