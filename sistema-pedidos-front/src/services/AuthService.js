const API_BASE_URL = 'http://localhost:8080';

export const loginUsuario = async (email, senha) => {
    try {
        const response = await fetch(`${API_BASE_URL}/usuario/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
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