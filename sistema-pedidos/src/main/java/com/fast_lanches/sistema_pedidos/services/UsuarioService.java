package com.fast_lanches.sistema_pedidos.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fast_lanches.sistema_pedidos.dto.UsuarioRequestDTO;
import com.fast_lanches.sistema_pedidos.dto.UsuarioResponseDTO;
import com.fast_lanches.sistema_pedidos.model.Usuario;
import com.fast_lanches.sistema_pedidos.repository.UsuarioRepository;

import jakarta.transaction.Transactional;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public UsuarioResponseDTO criarUsuario(UsuarioRequestDTO usuarioDto){
        //verificar email
        if (usuarioRepository.findByEmail(usuarioDto.getEmail()).isPresent()){
            throw new RuntimeException("Email já cadastrado");
        }

        Usuario usuario = new Usuario();
        usuario.setNome(usuarioDto.getNome());
        usuario.setEmail(usuarioDto.getEmail());
        usuario.setDataNascimento((usuarioDto.getDataNascimento()));
        usuario.setSenha(passwordEncoder.encode(usuarioDto.getSenha()));
        usuario.setTipo(usuarioDto.getTipo());

        Usuario usuarioSalvo = usuarioRepository.save(usuario);

        return modelMapper.map(usuarioSalvo, UsuarioResponseDTO.class);
    }

    @Transactional
    public void excluirUsuario(Long id){
        if (!usuarioRepository.existsById(id)){
            throw new RuntimeException("Usuario nao existe!");
        }
        usuarioRepository.deleteById(id);
    }

    @Transactional
    public UsuarioResponseDTO editarUsuario(long id, UsuarioRequestDTO usuarioRequestDTO){
        Usuario usuarioEditar = usuarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuario nao encontrado!"));
    
        if (usuarioRequestDTO.getNome() != null) {
            usuarioEditar.setNome(usuarioRequestDTO.getNome());
        }
        if (usuarioRequestDTO.getDataNascimento() != null) {
            usuarioEditar.setDataNascimento(usuarioRequestDTO.getDataNascimento());
        }
        if (usuarioRequestDTO.getTipo() != null) {
            usuarioEditar.setTipo(usuarioRequestDTO.getTipo());
        }

        Usuario usuarioEditado = usuarioRepository.save(usuarioEditar);
        return modelMapper.map(usuarioEditado, UsuarioResponseDTO.class);
    }

    public List<UsuarioResponseDTO> listarUsuarios(){
        List<Usuario> usuarios = usuarioRepository.findAll();

        return usuarios.stream()
            .map(usuario -> modelMapper.map(usuario, UsuarioResponseDTO.class))
            .collect(Collectors.toList());
    }

}
