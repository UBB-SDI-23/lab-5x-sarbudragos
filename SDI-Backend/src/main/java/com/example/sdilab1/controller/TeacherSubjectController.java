package com.example.sdilab1.controller;

import com.example.sdilab1.model.TeacherSubject;
import com.example.sdilab1.model.TeacherSubjectDTO;
import com.example.sdilab1.service.TeacherSubjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TeacherSubjectController {
    private final TeacherSubjectService service;

    public TeacherSubjectController(TeacherSubjectService service) {
        this.service = service;
    }

    @GetMapping("/teacher-subjects")
    List<TeacherSubjectDTO> all() {
        return service.all();
    }

    @GetMapping("/teacher-subjects/{id}")
    TeacherSubjectDTO getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PostMapping("/teacher-subjects")
    TeacherSubjectDTO newTeacher(@RequestBody TeacherSubjectDTO newTeacherSubject){
        return service.newTeacherSubject(newTeacherSubject);
    }

    @PutMapping("/teacher-subjects/{id}")
    TeacherSubject modifyTeacher(@RequestBody TeacherSubject newTeacher, @PathVariable Integer id){
        return service.modifyTeacherSubject(newTeacher,id);
    }
    @DeleteMapping("/teacher-subjects/{id}")
    void deleteTeacher(@PathVariable Integer id){
        service.deleteTeacherSubject(id);
    }
}
