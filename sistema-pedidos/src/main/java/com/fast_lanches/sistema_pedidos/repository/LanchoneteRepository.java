package com.fast_lanches.sistema_pedidos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fast_lanches.sistema_pedidos.model.Lanchonete;

public interface LanchoneteRepository extends JpaRepository<Lanchonete, Long>{
    
}
