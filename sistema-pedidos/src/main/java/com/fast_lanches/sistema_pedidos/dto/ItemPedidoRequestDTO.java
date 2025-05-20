package com.fast_lanches.sistema_pedidos.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemPedidoRequestDTO {
    private long id;
    private long produtoId;
    private Integer quantidade;
}
