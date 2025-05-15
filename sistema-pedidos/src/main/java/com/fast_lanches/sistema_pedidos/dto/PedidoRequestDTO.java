package com.fast_lanches.sistema_pedidos.dto;

import java.util.List;
import com.fast_lanches.sistema_pedidos.enums.MetodoPagamento;
import com.fast_lanches.sistema_pedidos.model.Cliente;
import com.fast_lanches.sistema_pedidos.model.Endereco;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PedidoRequestDTO {
    
    private Cliente cliente;
    private Endereco endereco;
    private MetodoPagamento metodoPagamento;
    private long lanchoneteId;
    private List<ItemPedidoRequestDTO> itensPedido;
}
