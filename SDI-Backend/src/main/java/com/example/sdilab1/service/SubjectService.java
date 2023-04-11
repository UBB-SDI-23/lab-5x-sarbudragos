package com.example.sdilab1.service;

import com.example.sdilab1.model.*;
import com.example.sdilab1.repository.SubjectRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class SubjectService {
    private final SubjectRepository subjectRepository;

    public SubjectService(SubjectRepository subjectRepository){

        this.subjectRepository = subjectRepository;

    }

    public List<SubjectDTO> all() {
        return subjectRepository.findAll().stream()
                .map(SubjectDTO::fromSubject).collect(Collectors.toList());
    }

    public Page<Subject> getPage(Integer pageNumber, Integer pageSize){
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        return subjectRepository.findAll(pageable);
    }

    public SubjectDTO getById(Integer id) {
        Subject subject = subjectRepository.findById(id).orElse(null);
        if(subject == null){
            return null;
        }
        return SubjectDTO.fromSubject(subject);
    }

    public SubjectDTO newSubject(SubjectDTO newSubject){
        subjectRepository.save(SubjectDTO.toSubject(newSubject));
        return newSubject;
    }

    public Subject modifySubject(Subject newSubject, Integer id){
        return subjectRepository.findById(id)
                .map(subject -> {
                    subject.setName(newSubject.getName());
                    return subjectRepository.save(subject);
                })
                .orElseGet(() -> {
                    newSubject.setId(id);
                    return subjectRepository.save(newSubject);
                });
    }

    public void deleteSubject(Integer id){
        subjectRepository.deleteById(id);
    }

    public List<SubjectSalaryDTO> getSubjectsOrderedByMaximumSalary(){
        return subjectRepository.findAll().stream().map(subject -> SubjectSalaryDTO.fromSubject(subject,
                        subject.getTeacherSubjects().stream().filter(
                        teacherSubject -> Objects.equals(teacherSubject.getSubject().getId(), subject.getId())
                    ).mapToDouble(teacherSubject -> teacherSubject.getTeacher().getSalary()).max().orElse(0.0)
                )).sorted(Comparator.comparingDouble(SubjectSalaryDTO::getSalary)).collect(Collectors.toList());
    }
    public List<SubjectExperienceDTO> getSubjectsOrderedByAverageYearsOfExperience(){
        return subjectRepository.findAll().stream().map(subject -> SubjectExperienceDTO.fromSubject(subject,
                 subject.getTeacherSubjects().stream().filter(
                        teacherSubject -> Objects.equals(teacherSubject.getSubject().getId(), subject.getId())
                ).mapToDouble(TeacherSubject::getYearsOfExperience).average().orElse(0.0)
        )).sorted(Comparator.comparingDouble(SubjectExperienceDTO::getExperience)).collect(Collectors.toList());
    }
}
