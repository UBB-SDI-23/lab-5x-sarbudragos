package com.example.sdilab1.controller;

import com.example.sdilab1.config.JwtService;
import com.example.sdilab1.model.StudentShowAllDTO;
import com.example.sdilab1.model.TeacherSubject;
import com.example.sdilab1.model.TeacherSubjectDTO;
import com.example.sdilab1.service.TeacherSubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class TeacherSubjectController {
    private final TeacherSubjectService service;

    private final JwtService jwtService;

    @GetMapping("/teacher-subjects")
    Page<TeacherSubjectDTO> getPage(@RequestParam(defaultValue = "0") Integer pageNumber, @RequestParam(defaultValue = "10") Integer pageSize) {
        return service.getPage(pageNumber, pageSize);
    }
    @GetMapping("/teacher-subjects/{id}")
    TeacherSubjectDTO getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PostMapping("/teacher-subjects")
    TeacherSubjectDTO newTeacher(@RequestBody TeacherSubjectDTO newTeacherSubject, @RequestHeader(name="Authorization") String token){
        String username = jwtService.extractUsername(token.substring(7));
        return service.newTeacherSubject(newTeacherSubject, username);
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
