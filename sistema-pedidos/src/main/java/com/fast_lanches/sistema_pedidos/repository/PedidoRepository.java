package com.fast_lanches.sistema_pedidos.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fast_lanches.sistema_pedidos.enums.Status;
import com.fast_lanches.sistema_pedidos.model.Pedido;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    List<Pedido> findByStatusIn(List<Status> statusList);
    
}
