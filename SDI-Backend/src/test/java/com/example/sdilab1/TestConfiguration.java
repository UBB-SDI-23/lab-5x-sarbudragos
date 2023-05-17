package com.example.sdilab1;

import com.example.sdilab1.model.Student;
import com.example.sdilab1.model.Subject;
import com.example.sdilab1.model.Teacher;
import com.example.sdilab1.model.TeacherSubject;
import com.example.sdilab1.repository.StudentRepository;
import com.example.sdilab1.repository.SubjectRepository;
import com.example.sdilab1.service.StudentService;
import com.example.sdilab1.service.SubjectService;
import org.mockito.Mockito;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

@Profile("test")
@Configuration
public class TestConfiguration {


    @Bean
    @Primary
    public StudentService studentService() {
        return new StudentService(studentRepository());
    }


    public StudentRepository studentRepository() {
        Student RECORD_1 = new Student("Dragos", "Sarbu", 12, 9.9, "CS");
        RECORD_1.setId(1);
        Student RECORD_2 = new Student("Darius","Bors", 11, 8.9, "CS");
        RECORD_2.setId(2);
        Student RECORD_3 = new Student("Andrei", "Pascu", 10, 7.4, "SN");
        RECORD_3.setId(3);

        StudentRepository studentRepository = Mockito.mock(StudentRepository.class);

        List<Student> records = new ArrayList<>(Arrays.asList(RECORD_1, RECORD_2, RECORD_3));

        Mockito.when(studentRepository.findAll()).thenReturn(records);

        return studentRepository;
    }


    @Bean
    @Primary
    public SubjectService subjectService(){
        return new SubjectService(subjectRepository());
    }

    public SubjectRepository subjectRepository() {
        Teacher teacher_1 = new Teacher("Walter", "White", 51, 2500.0, "PhD");
        teacher_1.setId(1);
        Teacher teacher_2 = new Teacher("Andre", "Three-thousand", 30, 3000.0, "Bachelor");
        teacher_2.setId(2);
        Teacher teacher_3 = new Teacher("Richard", "Feynman", 60, 5000.0, "PhD");
        teacher_3.setId(3);

        Subject subject_1 = new Subject("Science", user);
        subject_1.setId(1);
        Subject subject_2 = new Subject("Music", user);
        subject_2.setId(2);

        TeacherSubject teacherSubject_1 = new TeacherSubject(teacher_1, subject_1, 15, "1");
        teacherSubject_1.setId(1);
        TeacherSubject teacherSubject_2 = new TeacherSubject(teacher_2, subject_2, 3, "3");
        teacherSubject_2.setId(2);
        TeacherSubject teacherSubject_3 = new TeacherSubject(teacher_3, subject_1, 30, "1");
        teacherSubject_3.setId(3);

        subject_1.setTeacherSubjects(new HashSet<>(List.of(teacherSubject_1, teacherSubject_3)));
        subject_2.setTeacherSubjects(new HashSet<>(List.of(teacherSubject_2)));

        teacher_1.setTeacherSubjects(new HashSet<>(List.of(teacherSubject_1)));
        teacher_2.setTeacherSubjects(new HashSet<>(List.of(teacherSubject_2)));
        teacher_3.setTeacherSubjects(new HashSet<>(List.of(teacherSubject_3)));

        SubjectRepository subjectRepository = Mockito.mock(SubjectRepository.class);

        List<Subject> subjects = new ArrayList<>(Arrays.asList(subject_1, subject_2));

        Mockito.when(subjectRepository.findAll()).thenReturn(subjects);

        return subjectRepository;
    }

}
