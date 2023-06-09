package com.example.sdilab1.service;

import com.example.sdilab1.model.*;
import com.example.sdilab1.repository.ClassroomRepository;
import com.example.sdilab1.repository.StudentRepository;
import com.example.sdilab1.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClassroomService {

    private final StudentRepository studentRepository;
    private final ClassroomRepository classroomRepository;

    private final UserRepository userRepository;

    public List<Classroom> all() {
        return classroomRepository.findTop100ById();
    }

    public Page<ClassroomShowAllDTO> getPage(Integer pageNumber, Integer pageSize){
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        return classroomRepository.findAll(pageable).map(ClassroomShowAllDTO::fromClassroom);
    }


    public ClassroomDTO getById(Integer id) {
        Classroom classroom = classroomRepository.findById(id).orElse(null);
        if(classroom == null){
            return null;
        }
        return ClassroomDTO.fromClassroom(classroom);
    }


    public void newClassroom(ClassroomDTO newClassroomDTO, String username) throws Exception {
        if(newClassroomDTO.getCapacity() < 0){
            throw new Exception("Classroom capacity can't be negative.");
        }

        Classroom newClassroom = ClassroomDTO.toClassroom(newClassroomDTO);
        User user = userRepository.findUserByUsername(username).orElseThrow();
        newClassroom.setUser(user);
        classroomRepository.save(newClassroom);
        userRepository.save(user);

    }

    public void addStudentsInBulk(List<Integer> student_ids, Integer id){
        Classroom classroom =  classroomRepository.findById(id).get();
        List<Student> studentList = classroom.getStudents();

        List<Student> newStudents = studentRepository.findAllById(student_ids).stream()
                .filter(student -> student.getClassroom() == null).peek(student -> student.setClassroom(classroom)).toList();

        studentList.addAll(newStudents);

        classroomRepository.save(classroom);
    }


    public void modifyClassroom(ClassroomDTO newClassroom, Integer id) throws Exception {
        if(newClassroom.getCapacity() < 0){
            throw new Exception("Classroom capacity can't be negative.");
        }
        Classroom repoClassroom = classroomRepository.findById(id).get();
        Classroom classroom = ClassroomDTO.toClassroom(newClassroom);
        classroom.setId(repoClassroom.getId());
        classroomRepository.save(classroom);
    }

    public void deleteClassroom(Integer id){
        classroomRepository.deleteById(id);
    }


    public List<StudentDTO> getStudentsByClassroomId(Integer id) {
        Classroom classroom = classroomRepository.findById(id).orElse(null);
        if(classroom == null){
            return new ArrayList<>();
        }
        return classroom.getStudents().stream().map(StudentDTO::fromStudent).collect(Collectors.toList());
    }

    public Page<Classroom> autoComplete(String query) {
        return classroomRepository.findAutoComplete(query, PageRequest.of(0, 5));
    }
}
