package com.example.sdilab1.controller;

import com.example.sdilab1.config.JwtService;
import com.example.sdilab1.model.Message;
import com.example.sdilab1.model.UserDTO;
import com.example.sdilab1.model.UserProfile;
import com.example.sdilab1.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    private final JwtService jwtService;

    @GetMapping("/user/{id}")
    public ResponseEntity<UserDTO> getById(@PathVariable Integer id){
        return ResponseEntity.ok(userService.getById(id));
    }

    @GetMapping("/user/getByUsername/{username}")
    public ResponseEntity<UserDTO> getByUsername(@PathVariable String username){
        return ResponseEntity.ok(userService.getByUserName(username));
    }

    @GetMapping("/user/thisUser")
    public ResponseEntity<UserDTO> getCurrentUser(@RequestHeader(name="Authorization") String token){
        String username = jwtService.extractUsername(token.substring(7));
        try {
            UserDTO userDTO = userService.getByUserName(username);
            return new ResponseEntity<>(userDTO, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/user/{userId}/userProfile")
    public ResponseEntity<Message> setUserProfile(@RequestBody UserProfile userProfile, @PathVariable Integer userId){
        try {
            userService.setUserProfile(userProfile, userId);
            return new ResponseEntity<>(new Message("OK"), HttpStatus.OK);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("user/{userId}/itemsPerPage")
    public ResponseEntity<Message> setItemsPerPage(@RequestParam Integer newItemsPerPage, @PathVariable Integer userId){
        try {
            userService.setItemsPerPage(newItemsPerPage, userId);
            return new ResponseEntity<>(new Message("OK"), HttpStatus.OK);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
}
