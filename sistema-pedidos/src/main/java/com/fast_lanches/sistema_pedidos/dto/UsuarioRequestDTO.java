package com.fast_lanches.sistema_pedidos.dto;

import java.time.LocalDate;

import com.fast_lanches.sistema_pedidos.enums.TipoUsuario;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioRequestDTO {
    private long id;
    private String nome;
    private String email;
    private String senha;
    private LocalDate dataNascimento;
    private TipoUsuario tipo; 
}
