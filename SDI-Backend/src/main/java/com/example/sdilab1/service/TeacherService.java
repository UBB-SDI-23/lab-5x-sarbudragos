package com.example.sdilab1.service;

import com.example.sdilab1.model.Teacher;
import com.example.sdilab1.model.TeacherDTO;
import com.example.sdilab1.repository.TeacherRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeacherService {
    private final TeacherRepository teacherRepository;

    public TeacherService(TeacherRepository teacherRepository){

        this.teacherRepository = teacherRepository;
    }

    public List<TeacherDTO> all() {
        return teacherRepository.findAll().stream()
                .map(TeacherDTO::fromTeacher).collect(Collectors.toList());
    }

    public TeacherDTO getById(Integer id) {
        Teacher teacher = teacherRepository.findById(id).orElse(null);
        if(teacher == null){
            return null;
        }
        return TeacherDTO.fromTeacher(teacher);
    }

    public TeacherDTO newTeacher(TeacherDTO newTeacher) throws Exception {
        if (newTeacher.getAge() < 0){
            throw new Exception("Teacher age can't be negative.");
        }
        if (newTeacher.getSalary() < 0){
            throw new Exception("Teacher salary can't be negative.");
        }
        teacherRepository.save(TeacherDTO.toTeacher(newTeacher));
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

}
