package com.fast_lanches.sistema_pedidos.dto;

import java.util.List;
import com.fast_lanches.sistema_pedidos.enums.MetodoPagamento;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PedidoResponseDTO {
    
    private long clienteId;
    private long enderecoId;
    private MetodoPagamento metodoPagamento;
    private long lanchoneteId;
    private List<ItemPedidoRequestDTO> itensPedido;
}
