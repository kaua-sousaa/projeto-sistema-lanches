package com.fast_lanches.sistema_pedidos.dto;

import java.util.List;

import com.fast_lanches.sistema_pedidos.enums.TipoUsuario;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class LoginResponseDTO {
    private String mensagem;
    private String email;
    private TipoUsuario tipoUsuario;
    private List<String> roles;
}
