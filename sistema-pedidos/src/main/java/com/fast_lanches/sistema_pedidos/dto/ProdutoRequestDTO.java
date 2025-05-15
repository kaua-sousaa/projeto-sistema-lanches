package com.fast_lanches.sistema_pedidos.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProdutoRequestDTO {
    private long id;
    private String nome;
    private String imagem;
    private BigDecimal preco;
    private String descricao;
    private long lanchonenteId;
}
