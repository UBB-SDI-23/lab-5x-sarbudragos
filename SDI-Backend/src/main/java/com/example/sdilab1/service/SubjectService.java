package com.example.sdilab1.service;

import com.example.sdilab1.model.*;
import com.example.sdilab1.repository.SubjectRepository;
import com.example.sdilab1.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubjectService {
    private final SubjectRepository subjectRepository;

    private final UserRepository userRepository;

    public List<SubjectDTO> all() {
        return subjectRepository.findAll().stream()
                .map(SubjectDTO::fromSubject).collect(Collectors.toList());
    }

    public Page<SubjectShowAllDTO> getPage(Integer pageNumber, Integer pageSize){
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        return subjectRepository.findAll(pageable).map(SubjectShowAllDTO::fromSubject);
    }

    public SubjectDTO getById(Integer id) {
        Subject subject = subjectRepository.findById(id).orElse(null);
        if(subject == null){
            return null;
        }
        return SubjectDTO.fromSubject(subject);
    }

    public SubjectDTO newSubject(SubjectDTO newSubject, String username){
        User user = userRepository.findUserByUsername(username).orElseThrow();
        Subject newSubjectObject = SubjectDTO.toSubject(newSubject);
        newSubjectObject.setUser(user);
        subjectRepository.save(newSubjectObject);
        userRepository.save(user);
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

    public List<SubjectSalaryDTO> getSubjectsOrderedByMaximumSalary(Integer pageNumber, Integer pageSize){
        return subjectRepository.findAll(PageRequest.of(pageNumber, pageSize)).stream().map(subject -> SubjectSalaryDTO.fromSubject(subject,
                        subject.getTeacherSubjects().stream().filter(
                        teacherSubject -> Objects.equals(teacherSubject.getSubject().getId(), subject.getId())
                    ).mapToDouble(teacherSubject -> teacherSubject.getTeacher().getSalary()).max().orElse(0.0)
                )).sorted(Comparator.comparingDouble(SubjectSalaryDTO::getSalary)).collect(Collectors.toList());
    }
    public List<SubjectExperienceDTO> getSubjectsOrderedByAverageYearsOfExperience(Integer pageNumber, Integer pageSize){
        return subjectRepository.findAll(PageRequest.of(pageNumber,pageSize)).stream().map(subject -> SubjectExperienceDTO.fromSubject(subject,
                 subject.getTeacherSubjects().stream().filter(
                        teacherSubject -> Objects.equals(teacherSubject.getSubject().getId(), subject.getId())
                ).mapToDouble(TeacherSubject::getYearsOfExperience).average().orElse(0.0)
        )).sorted(Comparator.comparingDouble(SubjectExperienceDTO::getExperience)).collect(Collectors.toList());
    }

    public Page<Subject> autoComplete(String query) {
        return subjectRepository.findAutoComplete(query, PageRequest.of(0, 5));
    }
}
