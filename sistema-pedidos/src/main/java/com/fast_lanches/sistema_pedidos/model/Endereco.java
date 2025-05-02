package com.fast_lanches.sistema_pedidos.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class Endereco {
    
    private String Endereco;
    private String numero;
    private String bairro;
    private String cidade;
    private String uf;
    private String complemento;
}
