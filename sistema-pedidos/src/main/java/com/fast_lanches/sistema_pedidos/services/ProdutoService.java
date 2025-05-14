package com.fast_lanches.sistema_pedidos.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fast_lanches.sistema_pedidos.dto.ProdutoRequestDTO;
import com.fast_lanches.sistema_pedidos.dto.ProdutoResponseDTO;
import com.fast_lanches.sistema_pedidos.model.Lanchonete;
import com.fast_lanches.sistema_pedidos.model.Produto;
import com.fast_lanches.sistema_pedidos.repository.LanchoneteRepository;
import com.fast_lanches.sistema_pedidos.repository.ProdutoRepository;

import jakarta.transaction.Transactional;

@Service
public class ProdutoService {
    
    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private LanchoneteRepository lanchonenteRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Transactional
    public ProdutoResponseDTO criaProduto(ProdutoRequestDTO produtoDto){
        
        Lanchonete lanchonete = lanchonenteRepository.findById(produtoDto.getLanchonenteId()).orElseThrow(() -> new RuntimeException("Lanchonete não encontrada!")); 
        
        Produto produto = new Produto();
        produto.setNome(produtoDto.getNome());
        produto.setImagem(produtoDto.getImagem());
        produto.setPreco(produtoDto.getPreco());
        produto.setDescricao(produtoDto.getDescricao());
        produto.setLanchonete(lanchonete);

        Produto produtoSalvo = produtoRepository.save(produto);

        return modelMapper.map(produtoSalvo, ProdutoResponseDTO.class);
    }

    public List<ProdutoResponseDTO> listarProdutos(){
        List<Produto> produtos = produtoRepository.findAll();
        return produtos.stream()
            .map(produto -> modelMapper.map(produto, ProdutoResponseDTO.class))
            .collect(Collectors.toList());
    }

    public ProdutoResponseDTO buscarProduto(Long id){
        Produto produto = produtoRepository.findById(id).orElseThrow(() -> new RuntimeException("Produto não encontrado!"));
        return modelMapper.map(produto, ProdutoResponseDTO.class);
    }

    @Transactional
    public void excluirProduto(Long id){
        if(!produtoRepository.existsById(id)){
            throw new RuntimeException("Produto não existe!");
        }
        produtoRepository.deleteById(id);
    }

    @Transactional
    public ProdutoResponseDTO editarProduto(Long id, ProdutoRequestDTO produtoRequestDTO){
        Produto produtoEditar = produtoRepository.findById(id).orElseThrow(() -> new RuntimeException("Produto não encontrado!"));

        if (produtoRequestDTO.getNome() != null){
            produtoEditar.setNome(produtoRequestDTO.getNome());
        }
        if (produtoRequestDTO.getDescricao() != null){
            produtoEditar.setDescricao(produtoRequestDTO.getDescricao());
        }
        if (produtoRequestDTO.getImagem() != null){
            produtoEditar.setImagem(produtoRequestDTO.getImagem());
        }
        if (produtoRequestDTO.getPreco() != null){
            produtoEditar.setPreco(produtoRequestDTO.getPreco());
        }

        Produto produtoEditado = produtoRepository.save(produtoEditar);
        return modelMapper.map(produtoEditado, ProdutoResponseDTO.class);
    }
}
