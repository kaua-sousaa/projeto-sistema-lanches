import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { verificarSessao } from "../services/AuthService";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [usuarioAtual, setUsuarioAtual] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        const validarTokenUsuario = async () => {
            const token = localStorage.getItem('userToken');
            
            if (!token) {
                setIsLoading(false);
                return false;
            }

            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken.exp * 1000 < Date.now()) {
                    console.log("Token expirado");
                    logout();
                    throw new Error("Token expirado");
                }
    
                const dadosUsuarioBackend = await verificarSessao();
    
                const dadosUsuario = {
                    email: dadosUsuarioBackend.email,
                    nome: dadosUsuarioBackend.nome,
                    tipoUsuario: dadosUsuarioBackend.tipoUsuario,
                    token: token
                };
                setUsuarioAtual(dadosUsuario);
            } catch(error){
                console.error("Erro ao validar token do usuário", error);
                logout();
            } finally {
                setIsLoading(false);
            }
        };

        validarTokenUsuario();
    },[]);

    const login = (dadosUsario) => {
        if (dadosUsario && dadosUsario.token){
            const dados = {
                email: dadosUsario.email,
                nome: dadosUsario.nome,
                tipo: dadosUsario.tipoUsuario,
                token: dadosUsario.token
            };
            setUsuarioAtual(dados);
            localStorage.setItem('userToken', JSON.stringify(dadosUsario.token));
        }
    };

    const logout = () => {
        localStorage.removeItem('userToken');
        setUsuarioAtual(null);
    };

    return (
        <AuthContext.Provider value={{ usuarioAtual, login, logout, isAuthenticated: !!usuarioAtual , isLoading} }>
            {children}
        </AuthContext.Provider>
    )


}

export const useAuth = () =>{
    return useContext(AuthContext);
}

export default AuthProvider;