package com.fast_lanches.sistema_pedidos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fast_lanches.sistema_pedidos.dto.ProdutoDTO;
import com.fast_lanches.sistema_pedidos.model.Produto;
import com.fast_lanches.sistema_pedidos.services.ProdutoService;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {
    
    @Autowired
    private ProdutoService produtoService;

    @PostMapping("/criarProduto")
    public Produto criarProduto(@RequestBody ProdutoDTO produtoDto){
        return produtoService.criaProduto(produtoDto);
    }

    @PostMapping("/excluirProduto/{id}")
    public void excluirProduto(@PathVariable long id){
        produtoService.excluirProduto(id);
    }

    @GetMapping("/buscarProdutos")
    public List<Produto> buscarProdutos(){
        return produtoService.listarProdutos();
    }

    @GetMapping("/buscarPorId/{id}")
    public Produto buscarProdutos(@PathVariable long id){
        return produtoService.buscarProduto(id);
    }
}
