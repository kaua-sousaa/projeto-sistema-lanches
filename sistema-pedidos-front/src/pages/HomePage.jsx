import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/comum/Button';


import { FiUserPlus, FiEdit, FiShare2, FiShoppingCart, FiMessageSquare, FiThumbsUp } from 'react-icons/fi';

const HomePage = () =>{
    const navigate = useNavigate();

    const handleCadastroClick = () => {
        navigate('/cadastro');
    };

    const handleLoginClick = () => {
        navigate('/login-page');
    };

    const cardStyle = "bg-slate-800 bg-opacity-60 backdrop-filter backdrop-blur-lg p-6 md:p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300";

    return (
        <div div className="min-h-screen bg-gradient-to-br from-teal-700 via-cyan-600 to-teal-800 flex flex-col items-center text-slate-100 px-4 py-12 md:py-20">
            
            <main className="text-center space-y-12 max-w-4xl w-full">
                <div className={`${cardStyle} p-8 md:p-12`}>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-white">
                        Sua Lanchonete Online, <span className="block md:inline text-orange-400">Descomplicada!</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-200 mb-10 leading-relaxed max-w-2xl mx-auto">
                        Crie seu cardápio digital em minutos, compartilhe com seus clientes e receba pedidos de forma fácil e rápida. Modernize sua lanchonete!
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Button
                            onClick={handleCadastroClick}
                            className="bg-orange-500 text-white hover:bg-orange-600 shadow-lg px-8 py-3 text-lg font-semibold rounded-lg w-full sm:w-auto cursor-pointer"
                        >
                            Crie seu Cardápio Grátis
                        </Button>
                        <Button
                            onClick={handleLoginClick}
                            className="bg-transparent border-2 border-orange-400 text-orange-300 hover:bg-orange-400 hover:text-white shadow-lg px-8 py-3 text-lg font-semibold rounded-lg w-full sm:w-auto cursor-pointer "
                        >
                            Já Tenho Conta
                        </Button>
                    </div>
                </div>

                {/* Seção "Como Funciona" */}
                <section className="py-12 md:py-16 w-full">
                    <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-12 text-white">Como Funciona? Simples Assim:</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
                        <div className={cardStyle}>
                            <FiUserPlus className="text-5xl text-orange-400 mb-4" />
                            <h3 className="text-xl font-semibold mb-2 text-white">1. Cadastre-se</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Crie sua conta gratuitamente e tenha acesso total à plataforma.
                            </p>
                        </div>
                        <div className={cardStyle}>
                            <FiEdit className="text-5xl text-orange-400 mb-4" />
                            <h3 className="text-xl font-semibold mb-2 text-white">2. Monte seu Cardápio</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Adicione produtos, categorias, preços e fotos. Intuitivo e rápido!
                            </p>
                        </div>
                        <div className={cardStyle}>
                            <FiShare2 className="text-5xl text-orange-400 mb-4" />
                            <h3 className="text-xl font-semibold mb-2 text-white">3. Compartilhe o Link</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Divulgue seu cardápio online nas redes sociais, WhatsApp e onde mais desejar.
                            </p>
                        </div>
                        <div className={cardStyle}>
                            <FiShoppingCart className="text-5xl text-orange-400 mb-4" />
                            <h3 className="text-xl font-semibold mb-2 text-white">4. Receba Pedidos</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                (Em breve!) Seus clientes fazem o pedido e você gerencia tudo facilmente.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Seção "O Que Dizem Nossos Parceiros" */}
                <section className="py-12 md:py-16 w-full">
                    <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-12 text-white">O Que Nossos Parceiros Dizem</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        <div className={`${cardStyle} relative`}>
                            <FiMessageSquare className="absolute top-4 right-4 text-4xl text-teal-500 opacity-50" />
                            <p className="text-slate-200 italic mb-4 leading-relaxed">
                                "A plataforma é incrível! Consegui colocar meu cardápio no ar em menos de uma hora e meus clientes adoraram a novidade. Super prático!"
                            </p>
                            <div className="flex items-center">
                                <FiThumbsUp className="text-2xl text-green-400 mr-3" /> 
                                <div>
                                    <p className="font-semibold text-white">Mariana Costa</p>
                                    <p className="text-xs text-teal-300">Chef da Cantina da Praça</p>
                                </div>
                            </div>
                        </div>
                        <div className={`${cardStyle} relative`}>
                            <FiMessageSquare className="absolute top-4 right-4 text-4xl text-teal-500 opacity-50" />
                            <p className="text-slate-200 italic mb-4 leading-relaxed">
                                "Finalmente uma solução simples para ter meu cardápio online. O compartilhamento do link é muito fácil e já estou vendo mais movimento!"
                            </p>
                            <div className="flex items-center">
                                <FiThumbsUp className="text-2xl text-green-400 mr-3" />
                                <div>
                                    <p className="font-semibold text-white">Roberto Dias</p>
                                    <p className="text-xs text-teal-300">Dono do Burger Club</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Seção de CTA Final */}
                <section className="py-12 md:py-16 w-full">
                     <div className={`${cardStyle} p-8 md:p-12`}>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Transforme Sua Lanchonete Agora!</h2>
                        <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-xl mx-auto">
                            Junte-se aos empreendedores que estão simplificando a gestão e alcançando mais clientes.
                        </p>
                        <Button
                            onClick={handleCadastroClick}
                            className="bg-orange-500 text-white hover:bg-orange-600 shadow-lg px-10 py-4 text-xl font-semibold rounded-lg"
                        >
                            Começar Gratuitamente
                        </Button>
                    </div>
                </section>
            </main>

            <footer className="mt-16 md:mt-20 pb-8 text-center text-teal-200 text-sm">
                <p>&copy; {new Date().getFullYear()} Seu Sistema de Lanches. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

export default HomePage;