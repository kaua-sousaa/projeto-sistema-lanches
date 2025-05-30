import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png'; 

const Header = () => {
    const navLinkClass = "text-slate-100 hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors";
    const activeNavLinkClass = "text-orange-400 bg-cyan-800 bg-opacity-50"; 

    return (
        <header className="bg-slate-800 bg-opacity-70 shadow-lg top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-28">
                    <div className="flex flex-col items-center">
                        <Link to="/" className="flex ">
                            <img 
                                className="h-40 w-auto"
                                src={logo} 
                                alt="Logo Sistema de Lanches" 
                            />
                        </Link>
                        <p className='text-white absolute top-20'>Pedidos express</p>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <NavLink 
                                to="/" 
                                className={({ isActive }) => `${navLinkClass} ${isActive ? activeNavLinkClass : ''}`}
                            >
                                Home
                            </NavLink>
                            <NavLink 
                                to="/cadastro" 
                                className={({ isActive }) => `${navLinkClass} ${isActive ? activeNavLinkClass : ''}`}
                            >
                                Cadastre-se
                            </NavLink>
                            <NavLink 
                                to="/login-page"
                                className={({ isActive }) => `${navLinkClass} ${isActive ? activeNavLinkClass : ''}`}
                            >
                                Login
                            </NavLink>
                            {/* Futuramente, para links de usuário logado:
                            <NavLink to="/dashboard" className={({ isActive }) => `${navLinkClass} ${isActive ? activeNavLinkClass : ''}`}>Meu Painel</NavLink>
                            <button onClick={handleLogout} className={navLinkClass}>Sair</button> 
                            */}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;