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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fast_lanches.sistema_pedidos.dto.LoginRequestDTO;
import com.fast_lanches.sistema_pedidos.dto.LoginResponseDTO;
import com.fast_lanches.sistema_pedidos.enums.TipoUsuario;
import com.fast_lanches.sistema_pedidos.services.CustomUserDetails;
import com.fast_lanches.sistema_pedidos.services.JwtService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    AuthController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public ResponseEntity<?> autenticarLogin(@Valid @RequestBody LoginRequestDTO loginRequest, HttpServletRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getSenha())
            );

            CustomUserDetails userDetails  = (CustomUserDetails) authentication.getPrincipal();

            String email = userDetails .getUsername();
            String nome = userDetails.getNomeCompleto();
            TipoUsuario tipoUsuario = userDetails.getTipoUsuarioEnum();
            List<String> roles = userDetails.getAuthorities().stream()
                                .map(GrantedAuthority::getAuthority)
                                .collect(Collectors.toList());

            final String jwt = jwtService.generateToken(userDetails);
            return ResponseEntity.ok(new LoginResponseDTO("Login Bem-sucedido!", email, nome, jwt, tipoUsuario, roles));

        } catch (BadCredentialsException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Erro: credenciais inválidas.");
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getUsuarioAtual(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Nenhum usuário autenticado.");
        }
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        LoginResponseDTO response = new LoginResponseDTO(
            "Usuário autenticado.",
            userDetails.getUsername(),
            userDetails.getNomeCompleto(),
            null,
            userDetails.getTipoUsuarioEnum(),
            userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList())
        );
        
        return ResponseEntity.ok(response);
    }
}
