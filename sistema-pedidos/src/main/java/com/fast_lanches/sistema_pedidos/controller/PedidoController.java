package com.fast_lanches.sistema_pedidos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fast_lanches.sistema_pedidos.dto.PedidoRequestDTO;
import com.fast_lanches.sistema_pedidos.dto.PedidoResponseDTO;
import com.fast_lanches.sistema_pedidos.enums.Status;
import com.fast_lanches.sistema_pedidos.services.PedidoService;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {
    
    @Autowired
    private PedidoService pedidoService;

    @PostMapping("/criarPedido")
    public ResponseEntity<PedidoResponseDTO> criarPedido (@RequestBody PedidoRequestDTO pedidoRequestDTO){
        PedidoResponseDTO pedidoCriado = pedidoService.criarPedido(pedidoRequestDTO);
        return ResponseEntity.status(201).body(pedidoCriado);
    }

    @GetMapping("/listarPedidos")
    public ResponseEntity<List<PedidoResponseDTO>> listarPedidos(){
        List<PedidoResponseDTO> pedidosListados = pedidoService.listarPedidos();
        return ResponseEntity.ok(pedidosListados);
    }

    @GetMapping("/pedidoPorStatus")
    public ResponseEntity<List<PedidoResponseDTO>> pedidoPorStatus(@RequestParam(value = "status", required = false) List<Status> statusList){
        List<PedidoResponseDTO> pedidoPorStatus = pedidoService.pedidoPorStatus(statusList);
        return ResponseEntity.ok(pedidoPorStatus);
    }

    @PutMapping("/alterarStatus/{id}")
    public ResponseEntity<PedidoResponseDTO> alterarStatus(@PathVariable long id, Status status){
        PedidoResponseDTO statusAlterado = pedidoService.alterarStatus(id, status);
        return ResponseEntity.ok(statusAlterado);
    }

}
