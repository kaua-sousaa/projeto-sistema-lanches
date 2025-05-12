package com.fast_lanches.sistema_pedidos.dto;

import java.time.LocalDate;

import com.fast_lanches.sistema_pedidos.enums.TipoUsuario;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioDTO {
    private String nome;
    private String email;
    private String senha;
    private LocalDate dataDeNascimento;
    private TipoUsuario tipo; 
}
