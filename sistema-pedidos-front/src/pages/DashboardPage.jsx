// Em src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { getMinhaLanchonete, criarLanchonete } from '../services/LanchoneteService'; // Importe os dois serviços
import CriarLanchoneteForm from '../components/forms/CriarLanchoneteForm'; // Importe o novo formulário
import { useAuth } from '../contexts/AuthContext';
import { FiLoader, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'; // Ícones para feedback

function DashboardPage() {
    const { usuarioAtual } = useAuth();
    const [lanchonete, setLanchonete] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState({ message: '', type: '' });

    useEffect(() => {
        const fetchLanchonete = async () => {
            try {
                const data = await getMinhaLanchonete();
                setLanchonete(data);
            } catch (error) {
                console.error("Erro ao buscar dados da lanchonete:", error);
                setFeedback({ message: 'Não foi possível carregar os dados. Tente atualizar a página.', type: 'error' });
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchLanchonete();
    }, []); 

    const handleCriarLanchonete = async (formData) => {
        setIsSubmitting(true);
        setFeedback({ message: '', type: '' });
        try {
            const novaLanchonete = await criarLanchonete(formData);
            setLanchonete(novaLanchonete);
            setFeedback({ message: 'Lanchonete criada com sucesso!', type: 'success' });
        } catch (error) {
            setFeedback({ message: error.message || 'Ocorreu um erro ao criar a lanchonete.', type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-slate-100">
                <FiLoader className="animate-spin text-4xl text-teal-600" />
                <span className="ml-4 text-lg text-slate-700">Carregando seus dados...</span>
            </div>
        );
    }
    const cardStyle = "bg-slate-800 bg-opacity-70 backdrop-filter backdrop-blur-lg p-8 sm:p-10 rounded-xl shadow-2xl";

    const feedbackMessageClasses = `p-4 my-4 rounded-md text-sm flex items-center gap-3 ${
        feedback.type === 'success' ? 'bg-green-100 text-green-800' :
        feedback.type === 'error'   ? 'bg-red-100 text-red-800' :
        'hidden'
    }`;


    return (
        // O min-h-[calc(...)] garante que o fundo cinza claro preencha o restante da tela
        <div className="bg-slate-100 min-h-[calc(100vh-5rem)] p-4 sm:p-6 md:p-8"> 
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Bem-vindo, {usuarioAtual?.nome || usuarioAtual?.email}!</h1>
                <p className="text-slate-600 mb-8">Este é o seu painel de gerenciamento.</p>
                
                {lanchonete ? (
                    // Se o usuário JÁ TEM uma lanchonete
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-teal-700">Painel da {lanchonete.nome}</h2>
                        <p className="text-slate-500 mt-2">Endereço: {lanchonete.endereco || 'Não informado'}</p>
                        <hr className="my-6" />
                        <h3 className="text-xl font-semibold text-slate-700 mb-4">Gerenciar Cardápio</h3>
                        <p className="text-slate-600">Implementar a criação e listagem de produtos do cardápio aqui.......em breve</p>
                    </div>
                ) : (
                    // Se o usuário AINDA NÃO TEM uma lanchonete
                    <div className={cardStyle}>
                        <h2 className="text-2xl font-semibold text-white mb-2">Primeiro Passo: Crie sua Lanchonete</h2>
                        <p className="mb-6 text-white">Você ainda não tem uma lanchonete cadastrada. Preencha os dados abaixo para começar.</p>
                        
                        <CriarLanchoneteForm onSubmit={handleCriarLanchonete} isLoading={isSubmitting} />

                        {feedback.message && (
                            <div className={feedbackMessageClasses} role="alert">
                                {feedback.type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
                                <span>{feedback.message}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DashboardPage;