package com.example.sdilab1.controller;

import com.example.sdilab1.model.Subject;
import com.example.sdilab1.model.SubjectDTO;
import com.example.sdilab1.model.SubjectExperienceDTO;
import com.example.sdilab1.model.SubjectSalaryDTO;
import com.example.sdilab1.service.SubjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SubjectController {
    private final SubjectService service;

    public SubjectController(SubjectService service) {
        this.service = service;
    }

    @GetMapping("/subjects")
    List<SubjectDTO> all() {
        return service.all();
    }

    @GetMapping("/subjects/{id}")
    SubjectDTO getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PostMapping("/subjects")
    SubjectDTO newSubject(@RequestBody SubjectDTO newSubject){
        return service.newSubject(newSubject);
    }

    @PutMapping("/subjects/{id}")
    Subject modifySubject(@RequestBody Subject newSubject, @PathVariable Integer id){
        return service.modifySubject(newSubject,id);
    }
    @DeleteMapping("/subjects/{id}")
    void deleteTeacher(@PathVariable Integer id){
        service.deleteSubject(id);
    }

    @GetMapping("/subjects/order-by-max-salary")
    List<SubjectSalaryDTO> getOrderedByMaxSalary() {
        return service.getSubjectsOrderedByMaximumSalary();
    }

    @GetMapping("/subjects/order-by-average-years-of-experience")
    List<SubjectExperienceDTO> getOrderedByAverageYearsOfExperience() {
        return service.getSubjectsOrderedByAverageYearsOfExperience();
    }
}
