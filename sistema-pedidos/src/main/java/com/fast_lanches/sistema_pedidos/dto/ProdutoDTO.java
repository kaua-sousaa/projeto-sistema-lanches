package com.fast_lanches.sistema_pedidos.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProdutoDTO {
    private long id;
    private String name;
    private String imagem;
    private double preco;
    private String descricao;
    private long lanchonenteId;
}
