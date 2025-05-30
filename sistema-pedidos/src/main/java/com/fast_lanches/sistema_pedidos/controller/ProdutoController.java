package com.fast_lanches.sistema_pedidos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fast_lanches.sistema_pedidos.dto.ProdutoRequestDTO;
import com.fast_lanches.sistema_pedidos.dto.ProdutoResponseDTO;
import com.fast_lanches.sistema_pedidos.services.ProdutoService;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {
    
    @Autowired
    private ProdutoService produtoService;

    @PostMapping("/criarProduto")
    public ResponseEntity<ProdutoResponseDTO> criarProduto(@RequestBody ProdutoRequestDTO produtoDto){
        ProdutoResponseDTO produtoCriado = produtoService.criaProduto(produtoDto);
        return ResponseEntity.status(201).body(produtoCriado);
    }

    @DeleteMapping("/excluirProduto/{id}")
    public ResponseEntity<Void> excluirProduto(@PathVariable long id){
        produtoService.excluirProduto(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/buscarProdutos")
    public ResponseEntity<List<ProdutoResponseDTO>> buscarProdutos(){
        List<ProdutoResponseDTO> produtosBuscados = produtoService.listarProdutos();
        return ResponseEntity.ok(produtosBuscados);
    }

    @GetMapping("/buscarPorId/{id}")
    public ResponseEntity<ProdutoResponseDTO> buscarProdutos(@PathVariable long id){
        ProdutoResponseDTO produtoBuscado = produtoService.buscarProduto(id);
        return ResponseEntity.ok(produtoBuscado);
    }

    @PutMapping("/editarProduto/{id}")
    public ResponseEntity<ProdutoResponseDTO> editarProduto(@PathVariable long id, @RequestBody ProdutoRequestDTO produtoRequestDTO){
        ProdutoResponseDTO produtoEditado = produtoService.editarProduto(id, produtoRequestDTO);
        return ResponseEntity.ok(produtoEditado);
    }
}
