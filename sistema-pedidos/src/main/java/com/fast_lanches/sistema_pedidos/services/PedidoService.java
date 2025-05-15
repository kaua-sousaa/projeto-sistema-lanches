package com.fast_lanches.sistema_pedidos.services;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fast_lanches.sistema_pedidos.dto.ItemPedidoRequestDTO;
import com.fast_lanches.sistema_pedidos.dto.PedidoRequestDTO;
import com.fast_lanches.sistema_pedidos.dto.PedidoResponseDTO;
import com.fast_lanches.sistema_pedidos.enums.Status;
import com.fast_lanches.sistema_pedidos.model.ItemPedido;
import com.fast_lanches.sistema_pedidos.model.Lanchonete;
import com.fast_lanches.sistema_pedidos.model.Pedido;
import com.fast_lanches.sistema_pedidos.model.Produto;
import com.fast_lanches.sistema_pedidos.repository.LanchoneteRepository;
import com.fast_lanches.sistema_pedidos.repository.PedidoRepository;
import com.fast_lanches.sistema_pedidos.repository.ProdutoRepository;

import jakarta.transaction.Transactional;

@Service
public class PedidoService {
    
    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private LanchoneteRepository lanchoneteRepository;
    
    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Transactional
    public PedidoResponseDTO criarPedido(PedidoRequestDTO pedidoRequestDTO){
        Pedido pedido = new Pedido();
        Lanchonete lanchonete = lanchoneteRepository.findById(pedidoRequestDTO.getLanchoneteId()).orElseThrow(() -> new RuntimeException("Lanchonete não encontrada!"));

        pedido.setCliente(pedidoRequestDTO.getCliente());
        pedido.setEndereco(pedidoRequestDTO.getEndereco());
        pedido.setMetodoPagamento(pedidoRequestDTO.getMetodoPagamento());
        pedido.setStatus(Status.EM_PREPARO);
        pedido.setDataHoraPedido(LocalDateTime.now());
        pedido.setLanchonete(lanchonete);
        BigDecimal valorTotal = BigDecimal.ZERO;

        List<ItemPedido> itensPedido = new ArrayList<>();

        for (ItemPedidoRequestDTO itemDTO : pedidoRequestDTO.getItensPedido()){
            Produto produto = produtoRepository.findById(itemDTO.getProdutoId()).orElseThrow(()-> new RuntimeException("Produto não encontrado!"));

            ItemPedido itemPedido = new ItemPedido();
            itemPedido.setProduto(produto);
            itemPedido.setPedido(pedido);
            itemPedido.setQuantidade(itemDTO.getQuantidade());
            itemPedido.setPrecoUnitario(produto.getPreco());
            valorTotal = produto.getPreco().multiply(new BigDecimal(itemDTO.getQuantidade()));
            itensPedido.add(itemPedido);
        }

        pedido.setItensPedido(itensPedido);
        pedido.setValorTotal(valorTotal);
        Pedido pedidoSalvo = pedidoRepository.save(pedido);

        return modelMapper.map(pedidoSalvo, PedidoResponseDTO.class);
    }

    public List<PedidoResponseDTO> listarPedidos(){
        List<Pedido> pedidos = pedidoRepository.findAll();
        return pedidos.stream()
            .map(pedido -> modelMapper.map(pedido, PedidoResponseDTO.class))
            .collect(Collectors.toList());
    }
}
