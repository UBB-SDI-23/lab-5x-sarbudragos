package com.example.sdilab1.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class UserDTO {
    private Integer id;

    private String username;

    @JsonIgnore
    private String password;

    private UserProfile userProfile;

    private Role role;

    @JsonIgnore
    private List<Classroom> classrooms;

    @JsonIgnore
    private List<Student> students;

    @JsonIgnore
    private List<Teacher> teachers;

    @JsonIgnore
    private List<Subject> subjects;

    @JsonIgnore
    private List<TeacherSubject> teacherSubjects;

    private Integer itemsPerPage;

    public static UserDTO fromUser(User user){
        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                user.getUserProfile(),
                user.getRole(),
                user.getClassrooms(),
                user.getStudents(),
                user.getTeachers(),
                user.getSubjects(),
                user.getTeacherSubjects(),
                user.getItemsPerPage()
        );
    }

    public static User toUser(UserDTO userDTO){
        User user = new User();
        user.setId(userDTO.id);
        user.setUsername(userDTO.username);
        user.setPassword(userDTO.password);
        user.setUserProfile(userDTO.userProfile);
        user.setRole(userDTO.role);
        user.setClassrooms(userDTO.classrooms);
        user.setStudents(userDTO.students);
        user.setTeachers(userDTO.teachers);
        user.setSubjects(userDTO.subjects);
        user.setTeacherSubjects(userDTO.teacherSubjects);
        user.setItemsPerPage(userDTO.itemsPerPage);
        return user;
    }

    public Integer getNumberOfClassrooms(){
        return classrooms.size();
    }

    public Integer getNumberOfStudents(){
        return students.size();
    }

    public Integer getNumberOfTeachers(){
        return teachers.size();
    }

    public Integer getNumberOfSubjects(){
        return subjects.size();
    }

    public Integer getNumberOfTeacherSubjects(){
        return teacherSubjects.size();
    }
}
