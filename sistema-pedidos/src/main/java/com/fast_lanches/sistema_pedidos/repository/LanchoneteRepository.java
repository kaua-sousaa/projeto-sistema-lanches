package com.fast_lanches.sistema_pedidos.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fast_lanches.sistema_pedidos.model.Lanchonete;

public interface LanchoneteRepository extends JpaRepository<Lanchonete, Long>{
    Optional<Lanchonete> findByUsuarioId(Long id);
    boolean existsByUsuarioId(Long id);
}
