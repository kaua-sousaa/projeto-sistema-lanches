// src/components/forms/CriarLanchoneteForm.jsx
import React, { useState } from 'react';
import InputField from '../comum/Input';
import Button from '../comum/Button'

function CriarLanchoneteForm({ onSubmit, isLoading }) {
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '', 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.nome) {
            alert('O nome da lanchonete é obrigatório.');
            return;
        }
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
                id="nome"
                name="nome"
                label="Nome da Lanchonete"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Ex: Lanchonete do Zé"
                required
                disabled={isLoading}
            />
            <InputField
                id="descricao"
                name="descricao"
                label="Descrição Curta (opcional)"
                type="textarea" // Se você adaptar seu InputField para aceitar textarea
                value={formData.descricao}
                onChange={handleChange}
                placeholder="Ex: Os melhores lanches da região!"
                disabled={isLoading}
            />
            <Button type="submit" isLoading={isLoading} disabled={isLoading} fullWidth>
                {isLoading ? 'Criando...' : 'Criar Minha Lanchonete'}
            </Button>
        </form>
    );
}

export default CriarLanchoneteForm;