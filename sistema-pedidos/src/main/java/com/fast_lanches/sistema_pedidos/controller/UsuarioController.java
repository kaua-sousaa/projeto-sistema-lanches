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

    @DeleteMapping("/excluirUsuario/{id}")
    public ResponseEntity<Void> excluirUsuario(@PathVariable long id){
        usuarioService.excluirUsuario(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/editarUsuario/{id}")
    public ResponseEntity<UsuarioResponseDTO> editarUsuario(@PathVariable long id, @RequestBody UsuarioRequestDTO usuarioRequestDTO){
        UsuarioResponseDTO usuarioResponseDTO = usuarioService.editarUsuario(id, usuarioRequestDTO);
        return ResponseEntity.ok(usuarioResponseDTO);
    }
}
