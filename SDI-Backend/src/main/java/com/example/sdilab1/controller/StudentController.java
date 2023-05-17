package com.example.sdilab1.controller;

import com.example.sdilab1.config.JwtService;
import com.example.sdilab1.model.Message;
import com.example.sdilab1.model.Student;
import com.example.sdilab1.model.StudentDTO;
import com.example.sdilab1.model.StudentShowAllDTO;
import com.example.sdilab1.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class StudentController {

    private final StudentService service;

    private final JwtService jwtService;

    @GetMapping("/students")
    Page<StudentShowAllDTO> getPage(@RequestParam(defaultValue = "0") Integer pageNumber, @RequestParam(defaultValue = "10") Integer pageSize) {
       return service.getPage(pageNumber, pageSize);
    }

    @GetMapping("/students/{id}")
    StudentDTO getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PostMapping("/students")
    ResponseEntity<Message> newStudent(@RequestBody StudentDTO newStudent, @RequestHeader(name="Authorization") String token){
        try {
            String username = jwtService.extractUsername(token.substring(7));
            service.newStudent(newStudent, username);
            return new ResponseEntity<>(new Message("OK"), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/students/{id}")
    ResponseEntity<Message> modifyStudent(@RequestBody Student newStudent, @PathVariable Integer id){
        try {
            service.modifyStudent(newStudent,id);
            return new ResponseEntity<>(new Message("OK"), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.BAD_REQUEST);
        }

    }
    @DeleteMapping("/students/{id}")
    void deleteStudent(@PathVariable Integer id){
        service.deleteStudent(id);
    }

    @GetMapping(path="/students/grade-filter")
    public @ResponseBody List<StudentShowAllDTO> getAllStudentsWithWeightBiggerThan(@RequestParam Double grade,
                                                                             @RequestParam(defaultValue = "0") Integer pageNumber,
                                                                             @RequestParam(defaultValue = "10") Integer pageSize) {
        return service.getAllStudentsWithAverageGradeBiggerThan(grade, pageNumber, pageSize);
    }


}
