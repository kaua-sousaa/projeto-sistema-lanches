package com.fast_lanches.sistema_pedidos.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fast_lanches.sistema_pedidos.dto.ProdutoDTO;
import com.fast_lanches.sistema_pedidos.model.Lanchonete;
import com.fast_lanches.sistema_pedidos.model.Produto;
import com.fast_lanches.sistema_pedidos.repository.LanchoneteRepository;
import com.fast_lanches.sistema_pedidos.repository.ProdutoRepository;

@Service
public class ProdutoService {
    
    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private LanchoneteRepository lanchonenteRepository;

    public Produto criaProduto(ProdutoDTO produtoDto){
        
        Lanchonete lanchonete = lanchonenteRepository.findById(produtoDto.getLanchonenteId()).orElseThrow(() -> new RuntimeException("Lanchonete não encontrada!")); 
        
        Produto produto = new Produto();
        produto.setNome(produtoDto.getName());
        produto.setImagem(produtoDto.getImagem());
        produto.setPreco(produtoDto.getPreco());
        produto.setDescricao(produtoDto.getDescricao());
        produto.setLanchonete(lanchonete);

        return produtoRepository.save(produto);
    }

    public List<Produto> listarProdutos(){
        return produtoRepository.findAll();
    }

    public Produto buscarProduto(Long id){
        return produtoRepository.findById(id).orElseThrow(() -> new RuntimeException("Produto não encontrado!"));
    }

    public void excluirProduto(Long id){
        produtoRepository.deleteById(id);
    }
}
