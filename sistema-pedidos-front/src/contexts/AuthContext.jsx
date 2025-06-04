import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [usuarioAtual, setUsuarioAtual] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => { 
        const token = localStorage.getItem('userToken');
        if (token) {
            setUsuarioAtual({ token });
        }
        setIsLoading(false);
    },[]);

    const login = (dadosUsario) => {
        localStorage.setItem('userToken', dadosUsario.token);

        console.log("dadosUsario", dadosUsario);

        setUsuarioAtual({
            email: dadosUsario.email,
            nome: dadosUsario.nome,
            tipo: dadosUsario.tipoUsuario,
            token: dadosUsario.token
        });
    };

    const logout = () => {
        localStorage.removeItem('userToken');
        setUsuarioAtual(null);
    };

    if (isLoading){
        return null;
    }

    return (
        <AuthContext.Provider value={{ usuarioAtual, login, logout, isAuthenticated: !!usuarioAtual } }>
            {children}
        </AuthContext.Provider>
    )


}

export const useAuth = () =>{
    return useContext(AuthContext);
}

export default AuthProvider;