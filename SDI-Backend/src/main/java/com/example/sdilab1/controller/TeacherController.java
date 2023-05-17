package com.example.sdilab1.controller;

import com.example.sdilab1.config.JwtService;
import com.example.sdilab1.model.*;
import com.example.sdilab1.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class TeacherController {
    private final TeacherService service;

    private final JwtService jwtService;

    @GetMapping("/teachers")
    Page<TeacherShowAllDTO> getPage(@RequestParam(defaultValue = "0") Integer pageNumber, @RequestParam(defaultValue = "10") Integer pageSize) {

        return service.getPage(pageNumber, pageSize);
    }

    @GetMapping("/teachers/{id}")
    TeacherDTO getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PostMapping("/teachers")
    ResponseEntity<Message> newTeacher(@RequestBody TeacherDTO newTeacher, @RequestHeader(name="Authorization") String token){
        try {
            String username = jwtService.extractUsername(token.substring(7));
            service.newTeacher(newTeacher, username);
            return new ResponseEntity<>(new Message("OK"), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/teachers/{id}")
    ResponseEntity<Message> modifyTeacher(@RequestBody Teacher newTeacher, @PathVariable Integer id) {
        try {
            service.modifyTeacher(newTeacher,id);
            return new ResponseEntity<>(new Message("OK"), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
    @DeleteMapping("/teachers/{id}")
    void deleteTeacher(@PathVariable Integer id){
        service.deleteTeacher(id);
    }

    @GetMapping("/teachers/autocomplete")
    public Page<Teacher> autoComplete(@RequestParam String query) {
        return service.autoComplete(query);
    }
}
