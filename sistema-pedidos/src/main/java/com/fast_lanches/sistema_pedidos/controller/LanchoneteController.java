package com.fast_lanches.sistema_pedidos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fast_lanches.sistema_pedidos.dto.LanchoneteDTO;
import com.fast_lanches.sistema_pedidos.services.LanchoneteService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/lanchonete")
public class LanchoneteController {
    
    @Autowired
    private LanchoneteService lanchoneteService;

    @PostMapping("/criarLanchonete")
    public ResponseEntity<LanchoneteDTO> criarLanchonete(@RequestBody LanchoneteDTO lanchoneteDTO){
        LanchoneteDTO lanchoneteCriada = lanchoneteService.criarLanchonete(lanchoneteDTO);
        return ResponseEntity.status(201).body(lanchoneteCriada);
    }
}
