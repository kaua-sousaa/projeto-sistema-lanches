const API_BASE_URL = 'http://localhost:8080';
import { fetchWithAuth } from './ApiClient';

export const criarLanchonete = async (dadosLanchonete) => {
    const dados = {
        nome: dadosLanchonete.nome,
        descricao: dadosLanchonete.descricao,
    };

    try {
        const response = await fetchWithAuth('/lanchonete/criarLanchonete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || `Erro ${response.status} ao criar lanchonete`);
        }

        return responseData
    }catch(error) {
        console.error("Erro no serviço de criar lanchonete", error);
        throw error;
    }
}

export const getMinhaLanchonete = async () => {
    try {
        const response = await fetchWithAuth(`/lanchonete/minhaLanchonete`, {
            method: 'GET',
        });
        if (response.status === 204) {
            return null;
        }

        if (!response.ok) {
            throw new Error(`Erro ${response.status} ao buscar minha lanchonete`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro no serviço de getMinhaLanchonete", error);
        throw error;
    }
}