package com.fast_lanches.sistema_pedidos.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fast_lanches.sistema_pedidos.dto.LanchoneteDTO;
import com.fast_lanches.sistema_pedidos.model.Lanchonete;
import com.fast_lanches.sistema_pedidos.model.Usuario;
import com.fast_lanches.sistema_pedidos.repository.LanchoneteRepository;
import com.fast_lanches.sistema_pedidos.repository.UsuarioRepository;

@Service
public class LanchoneteService {
    
    @Autowired
    private LanchoneteRepository lanchonenteRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public LanchoneteDTO criarLanchonete(LanchoneteDTO lanchoneteDto){
        Usuario usuario = usuarioRepository.findById(lanchoneteDto.getUsuarioId()).orElseThrow(() -> new RuntimeException("Usuario nao encontrado"));

        Lanchonete lanchonete = new Lanchonete();
        lanchonete.setNome(lanchoneteDto.getNome());
        lanchonete.setDescricao(lanchoneteDto.getDescricao());
        lanchonete.setDataDeCriacao(lanchoneteDto.getDataDeCriacao());
        lanchonete.setUsuario(usuario);

        lanchonenteRepository.save(lanchonete);

        return lanchoneteDto;
    }

    public List<LanchoneteDTO> listarLanchonetes(){
        List<Lanchonete> lanchonetes = lanchonenteRepository.findAll();

        return lanchonetes.stream()
        .map(lanchonete -> new LanchoneteDTO(lanchonete.getId(),lanchonete.getNome(), lanchonete.getDescricao(), lanchonete.getDataDeCriacao(), lanchonete.getUsuario().getId()))
        .collect(Collectors.toList());
    } 
}
