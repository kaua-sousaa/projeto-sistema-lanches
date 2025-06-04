// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import LoginForm from '../components/forms/LoginForm'; 
import { loginUsuario } from '../services/AuthService';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
    const [feedback, setFeedback] = useState({ message: '', type: '' }); 
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLoginSubmit = async (credentials) => {
        setIsLoading(true);
        setFeedback({ message: '', type: '' });

        try {
            const responseData = await loginUsuario(credentials);

            login(responseData);
            
            setFeedback({
                message: 'Login realizado com sucesso! Redirecionando...',
                type: 'success'
            });
            if (responseData.token) {
                localStorage.setItem('userToken', responseData.token);
            }
            
            setTimeout(() => {
                navigate('/');
            }, 1500);

        } catch (error) {
            setFeedback({
                message: error.message || 'Falha no login. Verifique suas credenciais.',
                type: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const cardStyle = "bg-slate-800 bg-opacity-70 backdrop-filter backdrop-blur-lg p-8 sm:p-10 rounded-xl shadow-2xl";

    // Classes para a mensagem de feedback, adaptadas para o fundo escuro
    const feedbackMessageClasses = `p-4 my-4 rounded-md text-sm ${
        feedback.type === 'success' ? 'bg-green-500 bg-opacity-80 text-white' : 
        feedback.type === 'error'   ? 'bg-red-500 bg-opacity-80 text-white' :  
        'hidden'
    }`;

    return (
        //uso do calc é para garantir que o fundo ocupe toda a altura da tela, menos o cabeçalho
        <div className="min-h-[calc(100vh-7rem)] bg-gradient-to-br from-teal-700 via-cyan-600 to-teal-800 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                        Acesse sua conta
                    </h2>
                </div>

                <div className={cardStyle}>
                    <LoginForm onSubmit={handleLoginSubmit} isLoading={isLoading} />
                </div>

                {feedback.message && (
                    <div className={feedbackMessageClasses} role="alert">
                        {feedback.message}
                    </div>
                )}

                <p className="mt-6 text-center text-sm text-white">
                    Não tem uma conta?{' '}
                    <Link to="/cadastro" className="font-medium text-orange-400 hover:text-orange-500">
                        Cadastre-se aqui
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;