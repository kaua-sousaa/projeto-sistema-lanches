package com.fast_lanches.sistema_pedidos.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fast_lanches.sistema_pedidos.dto.UsuarioDTO;
import com.fast_lanches.sistema_pedidos.model.Usuario;
import com.fast_lanches.sistema_pedidos.repository.LanchoneteRepository;
import com.fast_lanches.sistema_pedidos.repository.UsuarioRepository;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private LanchoneteRepository lanchoneteRepository;

    public Usuario criarUsuario(UsuarioDTO usuarioDto){

        Usuario usuario = new Usuario();
        usuario.setNome(usuarioDto.getNome());
        usuario.setEmail(usuarioDto.getEmail());
        usuario.setDataNascimento(usuarioDto.getDataDeNascimento());
        usuario.setSenha(usuarioDto.getSenha());
        usuario.setTipo(usuarioDto.getTipo());

        return usuarioRepository.save(usuario);
    }


}
