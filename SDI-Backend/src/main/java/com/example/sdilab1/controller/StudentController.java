package com.example.sdilab1.controller;

import com.example.sdilab1.model.Student;
import com.example.sdilab1.model.StudentDTO;
import com.example.sdilab1.service.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @GetMapping("/students")
    List<Student> all() {
       return service.all();
    }

    @GetMapping("/students/{id}")
    StudentDTO getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PostMapping("/students")
    StudentDTO newStudent(@RequestBody StudentDTO newStudent){
        return service.newStudent(newStudent);
    }

    @PutMapping("/students/{id}")
    Student modifyStudent(@RequestBody Student newStudent, @PathVariable Integer id){
        return service.modifyStudent(newStudent,id);
    }
    @DeleteMapping("/students/{id}")
    void deleteStudent(@PathVariable Integer id){
        service.deleteStudent(id);
    }

    @GetMapping(path="/students/grade-filter")
    public @ResponseBody List<StudentDTO> getAllProductsWithWeightBiggerThan(@RequestParam Double grade) {
        return service.getAllStudentsWithAverageGradeBiggerThan(grade);
    }


}
