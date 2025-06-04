package com.fast_lanches.sistema_pedidos.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fast_lanches.sistema_pedidos.dto.LoginRequestDTO;
import com.fast_lanches.sistema_pedidos.dto.LoginResponseDTO;
import com.fast_lanches.sistema_pedidos.enums.TipoUsuario;
import com.fast_lanches.sistema_pedidos.services.CustomUserDetails;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
    
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> autenticarLogin(@Valid @RequestBody LoginRequestDTO loginRequest) {
        try{
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getSenha())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            TipoUsuario tipoUsuario = userDetails.getTipoUsuarioEnum();
            String email = userDetails.getUsername();
            String nome = userDetails.getNomeCompleto();
            List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(new LoginResponseDTO("Login bem sucedido!", email,nome, tipoUsuario, roles));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ERRO: email ou senha inválidos.");
        }
    }
}
