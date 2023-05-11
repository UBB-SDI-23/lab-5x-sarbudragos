package com.example.sdilab1.service;

import com.example.sdilab1.model.Classroom;
import com.example.sdilab1.model.Student;
import com.example.sdilab1.model.StudentDTO;
import com.example.sdilab1.model.StudentShowAllDTO;
import com.example.sdilab1.repository.ClassroomRepository;
import com.example.sdilab1.repository.StudentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    public StudentDTO newStudent(StudentDTO newStudent) throws Exception {
        if (newStudent.getAverageGrade() < 0){
            throw new Exception("Student average grade can't be negative.");
        }
        if (newStudent.getSchoolYear() < 0){
            throw new Exception("Student school year can't be negative.");
        }
        studentRepository.save(StudentDTO.toStudent(newStudent));
        return newStudent;
    }

    public Student modifyStudent(Student newStudent, Integer id) throws Exception {
        if (newStudent.getAverageGrade() < 0){
            throw new Exception("Student average grade can't be negative.");
        }
        if (newStudent.getSchoolYear() < 0){
            throw new Exception("Student school year can't be negative.");
        }

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

    public List<StudentShowAllDTO> getAllStudentsWithAverageGradeBiggerThan(Double grade, Integer pageNumber, Integer pageSize){
        return this.getPage(pageNumber, pageSize).stream().filter(student -> student.getAverageGrade() > grade )
                .collect(Collectors.toList());
    }
}
