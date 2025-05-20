package com.fast_lanches.sistema_pedidos.dto;

import java.util.List;
import com.fast_lanches.sistema_pedidos.enums.MetodoPagamento;
import com.fast_lanches.sistema_pedidos.enums.Status;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PedidoResponseDTO {
    private long id;
    private long clienteId;
    private long enderecoId;
    private MetodoPagamento metodoPagamento;
    private Status status;
    private long lanchoneteId;
    private List<ItemPedidoRequestDTO> itensPedido;
}
