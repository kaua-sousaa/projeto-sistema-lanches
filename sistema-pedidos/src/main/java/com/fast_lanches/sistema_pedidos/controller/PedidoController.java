package com.fast_lanches.sistema_pedidos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fast_lanches.sistema_pedidos.dto.PedidoRequestDTO;
import com.fast_lanches.sistema_pedidos.dto.PedidoResponseDTO;
import com.fast_lanches.sistema_pedidos.model.Pedido;
import com.fast_lanches.sistema_pedidos.services.PedidoService;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {
    
    @Autowired
    private PedidoService pedidoService;

    @PostMapping("/criarPedido")
    public ResponseEntity<PedidoResponseDTO> criarPedido (@RequestBody PedidoRequestDTO pedidoRequestDTO){
        PedidoResponseDTO pedidoResponseDTO = pedidoService.criarPedido(pedidoRequestDTO);
        return ResponseEntity.status(201).body(pedidoResponseDTO);
    }
}
