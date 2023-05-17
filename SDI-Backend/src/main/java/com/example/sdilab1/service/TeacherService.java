package com.example.sdilab1.service;

import com.example.sdilab1.model.*;
import com.example.sdilab1.repository.TeacherRepository;
import com.example.sdilab1.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeacherService {
    private final TeacherRepository teacherRepository;

    private final UserRepository userRepository;

    public List<TeacherDTO> all() {
        return teacherRepository.findAll().stream()
                .map(TeacherDTO::fromTeacher).collect(Collectors.toList());
    }

    public Page<TeacherShowAllDTO> getPage(Integer pageNumber, Integer pageSize){
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        return teacherRepository.findAll(pageable).map(TeacherShowAllDTO::fromTeacher);
    }

    public TeacherDTO getById(Integer id) {
        Teacher teacher = teacherRepository.findById(id).orElse(null);
        if(teacher == null){
            return null;
        }
        return TeacherDTO.fromTeacher(teacher);
    }

    public TeacherDTO newTeacher(TeacherDTO newTeacher, String username) throws Exception {
        if (newTeacher.getAge() < 0){
            throw new Exception("Teacher age can't be negative.");
        }
        if (newTeacher.getSalary() < 0){
            throw new Exception("Teacher salary can't be negative.");
        }
        User user = userRepository.findUserByUsername(username).orElseThrow();
        Teacher newTeacherObject = TeacherDTO.toTeacher(newTeacher);
        newTeacherObject.setUser(user);
        teacherRepository.save(newTeacherObject);
        userRepository.save(user);
        return newTeacher;
    }

    public Teacher modifyTeacher(Teacher newTeacher, Integer id) throws Exception {
        if (newTeacher.getAge() < 0){
            throw new Exception("Teacher age can't be negative.");
        }
        if (newTeacher.getSalary() < 0){
            throw new Exception("Teacher salary can't be negative.");
        }
        return teacherRepository.findById(id)
                .map(teacher -> {
                    teacher.setFirstName(newTeacher.getFirstName());
                    teacher.setLastName(newTeacher.getLastName());
                    teacher.setAge(newTeacher.getAge());
                    teacher.setSalary(newTeacher.getSalary());
                    return teacherRepository.save(teacher);
                })
                .orElseGet(() -> {
                    newTeacher.setId(id);
                    return teacherRepository.save(newTeacher);
                });
    }

    public void deleteTeacher(Integer id){
        teacherRepository.deleteById(id);
    }

    public Page<Teacher> autoComplete(String query) {
        return teacherRepository.findAutoComplete(query, PageRequest.of(0, 5));
    }
}
