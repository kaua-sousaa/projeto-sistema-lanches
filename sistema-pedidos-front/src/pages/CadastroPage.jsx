// src/pages/CadastroPage.jsx
import React, { useState } from 'react';
import CadastroUsuarioForm from '../components/forms/CadastroUsuarioForm'; 
import { registrarUsuario } from '../services/UsuarioService'; 
import { Link } from 'react-router-dom'; 

const CadastroPage = () => {
    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);
    

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

    // Estilo do card, similar ao da HomePage
    const cardStyle = "bg-slate-800 bg-opacity-70 backdrop-filter backdrop-blur-lg p-8 sm:p-10 rounded-xl shadow-2xl";
    
    const feedbackMessageClasses = `p-4 my-4 rounded-md text-sm ${
        feedback.type === 'success' ? 'bg-green-500 bg-opacity-80 text-white' :
        feedback.type === 'error'   ? 'bg-red-500 bg-opacity-80 text-white' :
        'hidden'
    }`;

    return (
        //uso do calc é para garantir que o fundo ocupe toda a altura da tela, menos o cabeçalho
        <div className="min-h-[calc(100vh-7rem)] bg-gradient-to-br from-teal-700 via-cyan-600 to-teal-800 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            
            <div className="w-full max-w-md space-y-7">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                        Criar nova conta
                    </h2>
                    <p className="mt-2 text-center text-sm text-slate-300">
                        Preencha os campos abaixo para se registrar.
                    </p>
                </div>

                <div className={cardStyle}>
                    <CadastroUsuarioForm onSubmit={handleCadastroSubmit} isLoading={isLoading} />
                </div>

                {feedback.message && (
                    <div className={feedbackMessageClasses} role="alert">
                        {feedback.message}
                    </div>
                )}
                <p className='mt-6 text-center text-sm text-white'>
                    Já possui uma conta?{' '}
                    <Link to="/login-page" className='font-medium text-orange-400 hover:text-orange-500'>
                        Faça login aqui
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default CadastroPage;