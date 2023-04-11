package com.example.sdilab1.controller;

import com.example.sdilab1.model.Message;
import com.example.sdilab1.model.Teacher;
import com.example.sdilab1.model.TeacherDTO;
import com.example.sdilab1.service.TeacherService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class TeacherController {
    private final TeacherService service;

    public TeacherController(TeacherService service) {
        this.service = service;
    }

    @GetMapping("/teachers")
    Page<Teacher> getPage(@RequestParam(defaultValue = "10") Integer pageNumber, @RequestParam(defaultValue = "10") Integer pageSize) {
        return service.getPage(pageNumber, pageSize);
    }

    @GetMapping("/teachers/{id}")
    TeacherDTO getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PostMapping("/teachers")
    ResponseEntity<Message> newTeacher(@RequestBody TeacherDTO newTeacher){
        try {
            service.newTeacher(newTeacher);
            return new ResponseEntity<>(new Message("OK"), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/teachers/{id}")
    ResponseEntity<Message> modifyTeacher(@RequestBody Teacher newTeacher, @PathVariable Integer id) throws Exception {
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

}
