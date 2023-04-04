package com.example.sdilab1.service;

import com.example.sdilab1.model.Student;
import com.example.sdilab1.model.StudentDTO;
import com.example.sdilab1.repository.ClassroomRepository;
import com.example.sdilab1.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    private final ClassroomRepository classroomRepository;

    public StudentService(StudentRepository studentRepository, ClassroomRepository classroomRepository) {
        this.studentRepository = studentRepository;
        this.classroomRepository = classroomRepository;
    }

    public List<Student> all() {
        return studentRepository.findAll();
    }

    public StudentDTO getById(Integer id) {
        Student student = studentRepository.findById(id).orElse(null);
        if(student == null){
            return null;
        }
        return StudentDTO.fromStudent(student);
    }

    public StudentDTO newStudent(StudentDTO newStudent){
        studentRepository.save(StudentDTO.toStudent(newStudent));
        return newStudent;
    }

    public Student modifyStudent(Student newStudent, Integer id){
        return studentRepository.findById(id)
                .map(student -> {
                    student.setFirstName(newStudent.getFirstName());
                    student.setLastName(newStudent.getLastName());
                    student.setSchoolYear(newStudent.getSchoolYear());
                    student.setAverageGrade(newStudent.getAverageGrade());
                    student.setSpecialization(newStudent.getSpecialization());
                    return studentRepository.save(student);
                })
                .orElseGet(() -> {
                    newStudent.setId(id);
                    return studentRepository.save(newStudent);
                });
    }

    public void deleteStudent(Integer id){
        studentRepository.deleteById(id);
    }

    public List<StudentDTO> getAllStudentsWithAverageGradeBiggerThan(Double grade){
        return studentRepository.findAll().stream().filter(student -> student.getAverageGrade() > grade )
                .map(StudentDTO::fromStudent).collect(Collectors.toList());
    }
}
