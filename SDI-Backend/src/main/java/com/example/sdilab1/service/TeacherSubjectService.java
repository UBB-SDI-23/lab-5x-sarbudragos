package com.example.sdilab1.service;
import com.example.sdilab1.model.Teacher;
import com.example.sdilab1.model.TeacherSubject;
import com.example.sdilab1.model.TeacherSubjectDTO;

import com.example.sdilab1.model.User;
import com.example.sdilab1.repository.TeacherSubjectRepository;
import com.example.sdilab1.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TeacherSubjectService {
    private final TeacherSubjectRepository teacherSubjectRepository;

    private final UserRepository userRepository;


    public Page<TeacherSubjectDTO> getPage(Integer pageNumber, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        return teacherSubjectRepository.findAll(pageable).map(TeacherSubjectDTO::fromTeacherSubject);
    }

    public TeacherSubjectDTO getById(Integer id) {
        TeacherSubject teacherSubject = teacherSubjectRepository.findById(id).orElse(null);
        if(teacherSubject == null){
            return null;
        }
        return TeacherSubjectDTO.fromTeacherSubject(teacherSubject);
    }

    public TeacherSubjectDTO newTeacherSubject(TeacherSubjectDTO teacherSubjectDTO, String username){
        User user = userRepository.findUserByUsername(username).orElseThrow();
        TeacherSubject newTeacherSubject = TeacherSubjectDTO.toTeacherSubject(teacherSubjectDTO);
        newTeacherSubject.setUser(user);
        teacherSubjectRepository.save(newTeacherSubject);
        userRepository.save(user);
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
