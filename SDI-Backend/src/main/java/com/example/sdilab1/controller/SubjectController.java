package com.example.sdilab1.controller;

import com.example.sdilab1.config.JwtService;
import com.example.sdilab1.model.*;
import com.example.sdilab1.service.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class SubjectController {
    private final SubjectService service;

    private final JwtService jwtService;

    @GetMapping("/subjects")
    Page<SubjectShowAllDTO> getPage(@RequestParam(defaultValue = "0") Integer pageNumber, @RequestParam(defaultValue = "10") Integer pageSize) {
        return service.getPage(pageNumber, pageSize);
    }

    @GetMapping("/subjects/{id}")
    SubjectDTO getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PostMapping("/subjects")
    SubjectDTO newSubject(@RequestBody SubjectDTO newSubject, @RequestHeader(name="Authorization") String token){
        String username = jwtService.extractUsername(token.substring(7));
        return service.newSubject(newSubject, username);
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
    List<SubjectSalaryDTO> getOrderedByMaxSalary(@RequestParam(defaultValue = "0") Integer pageNumber, @RequestParam(defaultValue = "10") Integer pageSize) {
        return service.getSubjectsOrderedByMaximumSalary(pageNumber, pageSize);
    }

    @GetMapping("/subjects/order-by-average-years-of-experience")
    List<SubjectExperienceDTO> getOrderedByAverageYearsOfExperience(@RequestParam(defaultValue = "0") Integer pageNumber, @RequestParam(defaultValue = "10") Integer pageSize) {
        return service.getSubjectsOrderedByAverageYearsOfExperience(pageNumber, pageSize);
    }
    @GetMapping("/subjects/autocomplete")
    public Page<Subject> autoComplete(@RequestParam String query){
        return service.autoComplete(query);
    }

}
