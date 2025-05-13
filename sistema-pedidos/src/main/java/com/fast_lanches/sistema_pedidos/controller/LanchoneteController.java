package com.fast_lanches.sistema_pedidos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fast_lanches.sistema_pedidos.dto.LanchoneteRequestDTO;
import com.fast_lanches.sistema_pedidos.dto.LanchoneteResponseDTO;
import com.fast_lanches.sistema_pedidos.services.LanchoneteService;


@RestController
@RequestMapping("/lanchonete")
public class LanchoneteController {
    
    @Autowired
    private LanchoneteService lanchoneteService;

    @PostMapping("/criarLanchonete")
    public ResponseEntity<LanchoneteResponseDTO> criarLanchonete(@RequestBody LanchoneteRequestDTO lanchoneteDTO){
        LanchoneteResponseDTO lanchoneteCriada = lanchoneteService.criarLanchonete(lanchoneteDTO);
        return ResponseEntity.status(201).body(lanchoneteCriada);
    }
}
