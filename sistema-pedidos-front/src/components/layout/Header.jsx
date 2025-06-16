import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'; 
import { CgProfile } from 'react-icons/cg';
import { useAuth } from '../../contexts/AuthContext';
import { FiBriefcase, FiLogOut, FiUser } from 'react-icons/fi';

const Header = () => {
    const { isAuthenticated, usuarioAtual, logout } = useAuth();
    const navigate = useNavigate();

    const [profileDropDown, setProfileDropDown] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        logout();
        setProfileDropDown(false);
        navigate('/');
    }

    useEffect(() => {
        const handleClickFora = (event) => {
            if(dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setProfileDropDown(false);
            }
        };
        document.addEventListener('mousedown', handleClickFora);
        return () => {
            document.removeEventListener('mousedown', handleClickFora);
        }
    },[dropdownRef])

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
                        <div className="ml-10 flex space-x-4 items-center">
                            <NavLink 
                                to="/" 
                                className={({ isActive }) => `${navLinkClass} ${isActive ? activeNavLinkClass : ''}`}
                            >
                                Home
                            </NavLink>
                            {!isAuthenticated ? (
                                <>
                                    <NavLink 
                                        to="/login-page"
                                        className={({ isActive }) => `${navLinkClass} ${isActive ? activeNavLinkClass : ''}`}
                                    >
                                        Login
                                    </NavLink>
                                    <NavLink 
                                        to="/cadastro" 
                                        className={({ isActive }) => `${navLinkClass} ${isActive ? activeNavLinkClass : ''}`}
                                    >
                                        Cadastre-se
                                    </NavLink>
                                
                                </>
                            ) : (
                                <div className='relative' ref={dropdownRef}>
                                    <button onClick={() => setProfileDropDown(!profileDropDown)} className={`${navLinkClass} flex items-center gap-2`}>
                                        <CgProfile className="text-white" />
                                        {usuarioAtual?.nome || 'Perfil'}
                                    </button>
                                    {profileDropDown && (
                                    <div className="absolute mt-2 w-56 origin-top-right bg-slate-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                                            {usuarioAtual && <p className="px-4 py-2 text-sm text-slate-300">Logado como: {usuarioAtual.email}</p>}
                                            <hr className="border-slate-600"/>
                                            <NavLink to="/meu-perfil" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-100 hover:bg-slate-600 hover:text-orange-300 w-full text-left" role="menuitem" onClick={() => setProfileDropDown(false)}>
                                                <FiUser /> Meu Perfil
                                            </NavLink>
                                            {/* Se o usuário for DONO_LANCHONETE, mostrar "Minha Lanchonete" */}
                                            {
                                            usuarioAtual && usuarioAtual.tipo === 'DONO' && (
                                                <NavLink to="/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-100 hover:bg-slate-600 hover:text-orange-300 w-full text-left" role="menuitem" onClick={() => setProfileDropDown(false)}>
                                                   <FiBriefcase /> Minha Lanchonete
                                                </NavLink>
                                            )}
                                            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-slate-100 hover:bg-slate-600 hover:text-orange-300 w-full text-left" role="menuitem">
                                                <FiLogOut /> Sair
                                            </button>
                                        </div>
                                    </div>
                                )}
                                </div>
                            )}
                            
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;