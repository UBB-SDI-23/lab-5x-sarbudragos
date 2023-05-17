package com.example.sdilab1.service;


import com.example.sdilab1.config.JwtService;
import com.example.sdilab1.model.*;
import com.example.sdilab1.repository.UserProfileRepository;
import com.example.sdilab1.repository.UserRepository;
import jakarta.persistence.Column;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.ErrorResponse;

import java.sql.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Random;

@Service
public class AuthenticationService {
    private Map<Code, User> registrationCodes;

    private Random codeGenerator;

    private final UserRepository userRepository;

    private final UserProfileRepository userProfileRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository userRepository, UserProfileRepository userProfileRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.registrationCodes = new HashMap<>();
        this.codeGenerator = new Random();
        this.userRepository = userRepository;
        this.userProfileRepository = userProfileRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public Integer register(RegisterRequest request) {
        UserProfile userProfile = new UserProfile(
                "No bio",
                "Unknown",
                new Date(System.currentTimeMillis()),
                "Unknown",
                "Unknown"
        );

        var user = User.builder()
                .username(request.getUserName())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .userProfile(userProfile)
                .itemsPerPage(19)
                .isActive(false)
                .build();
        userProfile.setUser(user);
        userRepository.save(user);
        userProfileRepository.save(userProfile);


        Code code = new Code(codeGenerator.nextInt(), new java.util.Date(System.currentTimeMillis() + (1000 * 60 * 10)) );
        registrationCodes.put(code, user);

        return code.getCode();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUserName(),
                        request.getPassword()
                )
        );
        var user = userRepository.findUserByUsername(request.getUserName()).orElseThrow();
        var jwt = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwt)
                .build();
    }

    public AuthenticationResponse confirm(Integer code) {
        if(registrationCodes.keySet().stream().noneMatch(code1 ->{ return Objects.equals(code1.getCode(), code);})){
            throw new AuthenticationServiceException("Invalid code");
        }

        Code code1 = registrationCodes.keySet().stream().filter(code2 ->{ return Objects.equals(code2.getCode(), code);})
                .findAny().orElseThrow();

        if(code1.getExpirationDate().before(new java.util.Date())){
            throw new AuthenticationServiceException("Expired code");
        }

        User user = registrationCodes.get(code1);

        user.setIsActive(true);

        userRepository.save(user);
        var jwt = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwt)
                .build();
    }
}
