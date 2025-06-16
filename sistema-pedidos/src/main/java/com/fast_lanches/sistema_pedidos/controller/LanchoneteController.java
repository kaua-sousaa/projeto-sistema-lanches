package com.fast_lanches.sistema_pedidos.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fast_lanches.sistema_pedidos.dto.LanchoneteRequestDTO;
import com.fast_lanches.sistema_pedidos.dto.LanchoneteResponseDTO;
import com.fast_lanches.sistema_pedidos.services.CustomUserDetails;
import com.fast_lanches.sistema_pedidos.services.LanchoneteService;


@RestController
@RequestMapping("/lanchonete")
public class LanchoneteController {
   
    @Autowired
    private LanchoneteService lanchoneteService;


    @PostMapping("/criarLanchonete")
    public ResponseEntity<LanchoneteResponseDTO> criarLanchonete(@RequestBody LanchoneteRequestDTO lanchoneteDTO, Authentication authentication){ 
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Long donoId = userDetails.getId();
        System.out.println(lanchoneteDTO);
        LanchoneteResponseDTO lanchoneteCriada = lanchoneteService.criarLanchonete(lanchoneteDTO, donoId);
        return ResponseEntity.status(201).body(lanchoneteCriada);
    }

    @GetMapping("/listarLanchonetes")
    public ResponseEntity<List<LanchoneteResponseDTO>> listarLanchonete(){
        List<LanchoneteResponseDTO> lanchonetesListadas = lanchoneteService.listarLanchonetes();

        return ResponseEntity.ok(lanchonetesListadas);
    }

    @GetMapping("/minhaLanchonete")
    public ResponseEntity<LanchoneteResponseDTO> minhaLanchonete(Authentication authentication){
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Long DonoId = userDetails.getId();

        Optional <LanchoneteResponseDTO> lanchoneteListada = lanchoneteService.minhaLanchonete(DonoId);

        return lanchoneteListada.map(dto -> ResponseEntity.ok(dto))
                .orElseGet(() -> ResponseEntity.noContent().build());
    }

    @PutMapping("/editarLanchonete/{id}")
    public ResponseEntity<LanchoneteResponseDTO> editarLanchonete(@PathVariable Long id, @RequestBody LanchoneteRequestDTO lanchoneteRequestDTO){
        LanchoneteResponseDTO lanchoneteEditada = lanchoneteService.editarLanchonete(id, lanchoneteRequestDTO);

        return ResponseEntity.ok(lanchoneteEditada);
    }

    @DeleteMapping("/excluirLanchonete/{id}")
    public ResponseEntity<Void> excluirLanchonete(@PathVariable long id){
        lanchoneteService.excluirLanchonente(id);
        return ResponseEntity.noContent().build();
    }

}
