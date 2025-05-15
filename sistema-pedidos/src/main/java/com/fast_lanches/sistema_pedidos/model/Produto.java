package com.fast_lanches.sistema_pedidos.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Produto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String imagem;

    @Column(nullable = false)
    private BigDecimal preco;
    
    @Column(nullable = false)
    private String descricao;
    
    @ManyToOne
    @JoinColumn(name = "lanchonente_id")
    private Lanchonete lanchonete;
    
}
