package com.example.sdilab1.controller;

import com.example.sdilab1.model.AuthenticationRequest;
import com.example.sdilab1.model.AuthenticationResponse;
import com.example.sdilab1.model.RegisterRequest;
import com.example.sdilab1.service.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register/confirm/{code}")
    public ResponseEntity<AuthenticationResponse> confirm(@PathVariable String code){
        return ResponseEntity.ok(authenticationService.confirm(Integer.valueOf(code)));
    }

    @PostMapping("/register")
    public ResponseEntity<Integer> register(
            @RequestBody RegisterRequest request
    ){
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody AuthenticationRequest request
    ){
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }
}
