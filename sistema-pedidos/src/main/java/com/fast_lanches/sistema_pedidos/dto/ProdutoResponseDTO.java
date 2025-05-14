package com.fast_lanches.sistema_pedidos.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProdutoResponseDTO {
    private long id;
    private String nome;
    private String imagem;
    private Double preco;
    private String descricao;
    private long lanchonenteId;
}
