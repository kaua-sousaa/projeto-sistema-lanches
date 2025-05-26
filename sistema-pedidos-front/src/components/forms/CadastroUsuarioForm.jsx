// src/components/forms/CadastroUsuarioForm.jsx
import React, { useState } from 'react';
import { TIPOS_USUARIO } from '../../enums/TiposUsuarios';
import Input from '../comum/Input';
import Button from '../comum/Button';

const CadastroUsuarioForm = ({ onSubmit, isLoading }) =>{
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        dataNascimento: '',
        tipo: TIPOS_USUARIO[0]?.value || 'DONO_LANCHONETE',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Input
                id="nome"
                name="nome"
                label="Nome Completo"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Digite seu nome completo"
                required
                disabled={isLoading}
                autoComplete="name"
            />
            <Input
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Digite seu email"
                required
                disabled={isLoading}
                autoComplete="email"
            />
            <Input
                id="senha"
                name="senha"
                label="Senha"
                type="password"
                value={formData.senha}
                onChange={handleChange}
                placeholder="Digite sua senha"
                required
                disabled={isLoading}
                autoComplete="new-password"
            />
            <Input
                id="dataNascimento"
                name="dataNascimento"
                label="Data de Nascimento"
                type="date"
                value={formData.dataNascimento}
                onChange={handleChange}
                placeholder="Selecione sua data de nascimento"
                required
                disabled={isLoading}
            />
            <div>
                <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Usuário
                </label>
                <select
                    id="tipo"
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md disabled:bg-gray-100"
                >
                    {TIPOS_USUARIO.map(tipoOpt => (
                        <option key={tipoOpt.value} value={tipoOpt.value}>
                            {tipoOpt.label}
                        </option>
                    ))}
                </select>
            </div>
            <Button type="submit" isLoading={isLoading} disabled={isLoading} fullWidth>
                Cadastrar
            </Button>
        </form>
    );
}

export default CadastroUsuarioForm;