// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import LoginForm from '../components/forms/LoginForm'; 
import { loginUsuario } from '../services/AuthService'; 
import { useNavigate } from 'react-router-dom'; 

function LoginPage() {
    const [feedback, setFeedback] = useState({ message: '', type: '' }); 
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLoginSubmit = async (credentials) => {
        setIsLoading(true);
        setFeedback({ message: '', type: '' });

        try {
            const responseData = await loginUsuario(credentials);
            setFeedback({
                message: 'Login realizado com sucesso! Redirecionando...',
                type: 'success'
            });
            if (responseData.token) {
                localStorage.setItem('userToken', responseData.token);
            }
            
            setTimeout(() => {
                navigate('/dashboard'); //mudar depois para a rota correta do dashboard
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

    const feedbackMessageClasses = `p-4 my-4 rounded-md text-sm ${
        feedback.type === 'success' ? 'bg-green-100 text-green-700' :
        feedback.type === 'error'   ? 'bg-red-100 text-red-700' :
        'hidden'
    }`;

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    {/* <img className="mx-auto h-12 w-auto" src="/your-logo.svg" alt="Logo" /> */}
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Acesse sua conta
                    </h2>
                </div>

                <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                    <LoginForm onSubmit={handleLoginSubmit} isLoading={isLoading} />
                </div>

                {feedback.message && (
                    <div className={feedbackMessageClasses} role="alert">
                        {feedback.message}
                    </div>
                )}

                <p className="mt-4 text-center text-sm">
                    Não tem uma conta?{' '}
                    <a href="/cadastro" onClick={(e) => { e.preventDefault(); navigate('/cadastro');}} className="font-medium text-indigo-600 hover:text-indigo-500">
                        Cadastre-se aqui
                    </a>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;