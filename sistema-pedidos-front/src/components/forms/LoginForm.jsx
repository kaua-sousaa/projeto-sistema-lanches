import React, { useState } from 'react';
import Input from '../comum/Input';
import Button from '../comum/Button';


const LoginForm = ({ onSubmit, isLoading }) => { 
    const [credentials, setCredentials] = useState({ email: 'kaua@gmail.com', senha: '123' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(credentials);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Input
                id="email-login"
                name="email"
                label="Email"
                type="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="Digite seu email"
                required
                disabled={isLoading}
                autoComplete="email"
            />
            <Input
                id="senha-login" 
                name="senha"
                label="Senha"
                type="password"
                value={credentials.senha}
                onChange={handleChange}
                placeholder="Digite sua senha"
                required
                disabled={isLoading}
                autoComplete="current-password"
            />
            <Button type="submit" isLoading={isLoading} disabled={isLoading} fullWidth>
                Entrar
            </Button>
        </form>
    );
}

export default LoginForm;