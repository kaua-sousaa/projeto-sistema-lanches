const API_BASE_URL = 'http://localhost:8080';
 
export const registrarUsuario = async (dadosUsuario) => {

    const dados = {
        nome: dadosUsuario.nome,
        email: dadosUsuario.email,
        senha: dadosUsuario.senha,
        dataNascimento: dadosUsuario.dataNascimento,
        tipo: dadosUsuario.tipo,
    };

    try{
        const response = await fetch(`${API_BASE_URL}/usuario/criarUsuario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados),
        });

        const responseData = await response.json();

        if (!response.ok){
            throw new Error(responseData.message || `Erro ${response.status} ao criar usuario`);
        }
        return responseData;
    } catch(error){
        console.log("Erro no serviço de registrarUsuario", error);
        throw error;
    }
}