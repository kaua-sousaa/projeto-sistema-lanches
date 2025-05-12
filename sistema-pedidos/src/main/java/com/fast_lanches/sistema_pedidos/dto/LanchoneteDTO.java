package com.fast_lanches.sistema_pedidos.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LanchoneteDTO {
    private long id;
    private String nome;
    private String descricao;
    private LocalDate dataDeCriacao;
    private long usuarioId;
}
