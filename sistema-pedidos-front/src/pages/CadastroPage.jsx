import React, { useState } from 'react';
import CadastroUsuarioForm from '../components/forms/CadastroUsuarioForm'; 
import { registrarUsuario } from '../services/UsuarioService' 
import { useNavigate } from 'react-router-dom';

const CadastroPage = () => {
    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleCadastroSubmit = async (formData) => {
        setIsLoading(true);
        setFeedback({ message: '', type: '' });

        try {
            const responseData = await registrarUsuario(formData);
            setFeedback({
                message: `Usuário "${responseData.nome || formData.nome}" cadastrado com sucesso!`,
                type: 'success'
            });

        } catch (error) {
            setFeedback({
                message: error.message || 'Falha ao cadastrar usuário. Tente novamente.',
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
                    {/* <img className="mx-auto h-12 w-auto" src="/your-logo.svg" alt="Workflow" /> */}
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Criar nova conta
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Preencha os campos abaixo para se registrar.
                    </p>
                </div>

                <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                    <CadastroUsuarioForm onSubmit={handleCadastroSubmit} isLoading={isLoading} />
                </div>

                {feedback.message && (
                    <div className={feedbackMessageClasses} role="alert">
                        {feedback.message}
                    </div>
                )}
                <p className='mt-4 text-center text-sm'>
                    Já possuí uma conta ?{' '}
                    <a href="/login-page" onClick={(e) => {e.preventDefault(); navigate('/login-page')}} className='font-medium text-indigo-600 hover:text-indigo-500 '>
                         Faça login aqui
                    </a>
                </p>
            </div>
        </div>
    );
}

export default CadastroPage;