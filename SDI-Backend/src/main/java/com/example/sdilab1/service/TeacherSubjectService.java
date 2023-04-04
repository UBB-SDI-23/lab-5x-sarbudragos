package com.example.sdilab1.service;
import com.example.sdilab1.model.TeacherSubject;
import com.example.sdilab1.model.TeacherSubjectDTO;

import com.example.sdilab1.repository.TeacherSubjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeacherSubjectService {
    private final TeacherSubjectRepository teacherSubjectRepository;

    public TeacherSubjectService(TeacherSubjectRepository teacherSubjectRepository){

        this.teacherSubjectRepository = teacherSubjectRepository;
    }

    public List<TeacherSubjectDTO> all() {
        return teacherSubjectRepository.findAll().stream()
                .map(TeacherSubjectDTO::fromTeacherSubject).collect(Collectors.toList());
    }

    public TeacherSubjectDTO getById(Integer id) {
        TeacherSubject teacherSubject = teacherSubjectRepository.findById(id).orElse(null);
        if(teacherSubject == null){
            return null;
        }
        return TeacherSubjectDTO.fromTeacherSubject(teacherSubject);
    }

    public TeacherSubjectDTO newTeacherSubject(TeacherSubjectDTO teacherSubjectDTO){
        teacherSubjectRepository.save(TeacherSubjectDTO.toTeacherSubject(teacherSubjectDTO));
        return teacherSubjectDTO;
    }

    public TeacherSubject modifyTeacherSubject(TeacherSubject newTeacherSubject, Integer id){
        return teacherSubjectRepository.findById(id)
                .map(teacherSubject -> {
                    teacherSubject.setTeacher(newTeacherSubject.getTeacher());
                    teacherSubject.setSubject(newTeacherSubject.getSubject());
                    return teacherSubjectRepository.save(teacherSubject);
                })
                .orElseGet(() -> {
                    newTeacherSubject.setId(id);
                    return teacherSubjectRepository.save(newTeacherSubject);
                });
    }

    public void deleteTeacherSubject(Integer id){
        teacherSubjectRepository.deleteById(id);
    }
}
