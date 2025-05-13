package com.fast_lanches.sistema_pedidos.controller;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fast_lanches.sistema_pedidos.dto.UsuarioRequestDTO;
import com.fast_lanches.sistema_pedidos.dto.UsuarioResponseDTO;
import com.fast_lanches.sistema_pedidos.services.UsuarioService;



@RestController
@RequestMapping("/usuario")
public class UsuarioController {
    
    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/criarUsuario")
    public ResponseEntity<UsuarioResponseDTO> criarUsuario(@RequestBody UsuarioRequestDTO usuarioDTO){
        UsuarioResponseDTO usuarioDTOCriado = usuarioService.criarUsuario(usuarioDTO);
        return ResponseEntity.status(201).body(usuarioDTOCriado);
    }

    @GetMapping("/listarUsuarios")
    public ResponseEntity<List<UsuarioResponseDTO>> listarUsuarios(){
        List<UsuarioResponseDTO> usuariosDto = usuarioService.listarUsuarios();
        return ResponseEntity.ok(usuariosDto);
    }
}
