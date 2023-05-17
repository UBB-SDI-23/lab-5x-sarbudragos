package com.example.sdilab1.service;

import com.example.sdilab1.model.Student;
import com.example.sdilab1.model.StudentDTO;
import com.example.sdilab1.model.StudentShowAllDTO;
import com.example.sdilab1.model.User;
import com.example.sdilab1.repository.StudentRepository;
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
public class StudentService {

    private final StudentRepository studentRepository;

    private final UserRepository userRepository;
    public Page<StudentShowAllDTO> getPage(Integer pageNumber, Integer pageSize){
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        return studentRepository.findAll(pageable).map(StudentShowAllDTO::fromStudent);
    }

    public StudentDTO getById(Integer id) {
        Student student = studentRepository.findById(id).orElse(null);
        if(student == null){
            return null;
        }
        return StudentDTO.fromStudent(student);
    }

    public void newStudent(StudentDTO newStudent, String username) throws Exception {
        if (newStudent.getAverageGrade() < 0){
            throw new Exception("Student average grade can't be negative.");
        }
        if (newStudent.getSchoolYear() < 0){
            throw new Exception("Student school year can't be negative.");
        }
        User user = userRepository.findUserByUsername(username).orElseThrow();
        Student student = StudentDTO.toStudent(newStudent);
        student.setUser(user);
        studentRepository.save(student);
        userRepository.save(user);
    }

    public void modifyStudent(Student newStudent, Integer id) throws Exception {
        if (newStudent.getAverageGrade() < 0){
            throw new Exception("Student average grade can't be negative.");
        }
        if (newStudent.getSchoolYear() < 0){
            throw new Exception("Student school year can't be negative.");
        }

        studentRepository.findById(id)
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

    public List<StudentShowAllDTO> getAllStudentsWithAverageGradeBiggerThan(Double grade, Integer pageNumber, Integer pageSize){
        return this.getPage(pageNumber, pageSize).stream().filter(student -> student.getAverageGrade() > grade )
                .collect(Collectors.toList());
    }
}
