package com.example.sdilab1.controller;

import com.example.sdilab1.config.JwtService;
import com.example.sdilab1.model.*;

import com.example.sdilab1.service.ClassroomService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RequiredArgsConstructor
@RestController
public class ClassroomController {
    private final ClassroomService service;

    private final JwtService jwtService;

    @GetMapping("/classrooms")
    public Page<ClassroomShowAllDTO> getPage(@RequestParam(defaultValue = "0") Integer pageNumber, @RequestParam(defaultValue = "10") Integer pageSize) {
        return service.getPage(pageNumber, pageSize);
    }

    @GetMapping("/classrooms/{id}")
    public ClassroomDTO getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PostMapping("/classrooms")
    public ResponseEntity<Message> newClassroom(@RequestBody ClassroomDTO newClassroom, @RequestHeader(name="Authorization") String token){
        try {
            String username = jwtService.extractUsername(token.substring(7));
            service.newClassroom(newClassroom, username);
            return new ResponseEntity<>(new Message("OK"), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/classrooms/{id}/students")
    public void addStudentsInBulk(@RequestBody List<Integer> student_ids, @PathVariable Integer id){
        service.addStudentsInBulk(student_ids, id);
    }

    @PutMapping("/classrooms/{id}")
    public ResponseEntity<Message> modifyClassroom(@RequestBody ClassroomDTO newClassroomDTO, @PathVariable Integer id) throws Exception {
        try {
            service.modifyClassroom(newClassroomDTO,id);
            return new ResponseEntity<>(new Message("OK"), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
    @DeleteMapping("/classrooms/{id}")
    public void deleteClassroom(@PathVariable Integer id){
        service.deleteClassroom(id);
    }

    @GetMapping("/classrooms/autocomplete")
    public Page<Classroom> autoComplete(@RequestParam String query){
        return service.autoComplete(query);
    }
}
