package com.fast_lanches.sistema_pedidos.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fast_lanches.sistema_pedidos.dto.LanchoneteRequestDTO;
import com.fast_lanches.sistema_pedidos.dto.LanchoneteResponseDTO;
import com.fast_lanches.sistema_pedidos.model.Lanchonete;
import com.fast_lanches.sistema_pedidos.model.Usuario;
import com.fast_lanches.sistema_pedidos.repository.LanchoneteRepository;
import com.fast_lanches.sistema_pedidos.repository.UsuarioRepository;

import jakarta.transaction.Transactional;

@Service
public class LanchoneteService {
    
    @Autowired
    private LanchoneteRepository lanchonenteRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Transactional
    public LanchoneteResponseDTO criarLanchonete(LanchoneteRequestDTO lanchoneteDto){
        Usuario usuario = usuarioRepository.findById(lanchoneteDto.getUsuarioId()).orElseThrow(() -> new RuntimeException("Usuario nao encontrado"));

        Lanchonete lanchonete = new Lanchonete();
        lanchonete.setNome(lanchoneteDto.getNome());
        lanchonete.setDescricao(lanchoneteDto.getDescricao());
        lanchonete.setDataDeCriacao(lanchoneteDto.getDataDeCriacao());
        lanchonete.setUsuario(usuario);

        Lanchonete lanchoneteSalva = lanchonenteRepository.save(lanchonete);

        return modelMapper.map(lanchoneteSalva, LanchoneteResponseDTO.class);
    }

    public List<LanchoneteResponseDTO> listarLanchonetes(){
        List<Lanchonete> lanchonetes = lanchonenteRepository.findAll();

        return lanchonetes.stream()
            .map(lanchonete -> modelMapper.map(lanchonete, LanchoneteResponseDTO.class))
            .collect(Collectors.toList());
    } 

    @Transactional
    public void excluirLanchonente(long id){
        if (!lanchonenteRepository.existsById(id)){
            throw new RuntimeException("Lanchonente não encontrada!");
        }
        lanchonenteRepository.deleteById(id);
    }

    @Transactional
    public LanchoneteResponseDTO editarLanchonete(long id, LanchoneteRequestDTO lanchoneteRequestDTO){
        Lanchonete lanchoneteEditar = lanchonenteRepository.findById(id).orElseThrow(()-> new RuntimeException("Lanchonete não encontrada!"));

        lanchoneteEditar.setNome(lanchoneteRequestDTO.getNome());
        lanchoneteEditar.setDescricao(lanchoneteRequestDTO.getDescricao());

        lanchonenteRepository.save(lanchoneteEditar);

        return modelMapper.map(lanchoneteEditar, LanchoneteResponseDTO.class);
    }
}
