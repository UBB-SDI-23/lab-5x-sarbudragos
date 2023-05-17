package com.example.sdilab1.model;

import java.util.Set;

public class SubjectShowAllDTO {
    private Integer id;

    private String name;

    private Set<TeacherSubject> teacherSubjects;

    private User user;

    public SubjectShowAllDTO(Integer id , String name, Set<TeacherSubject> teacherSubjects, User user){
        this.id = id;
        this.name = name;
        this.teacherSubjects = teacherSubjects;
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Double getAverageYearsOfExperience(){
        return teacherSubjects.stream().mapToInt(TeacherSubject::getYearsOfExperience).average().orElse(0);
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public static SubjectShowAllDTO fromSubject(Subject subject){
        return new SubjectShowAllDTO(
                subject.getId(),
                subject.getName(),
                subject.getTeacherSubjects(),
                subject.getUser());
    }

    public static Subject toSubject(SubjectShowAllDTO subjectDTO){
        Subject subject = new Subject();
        subject.setId(subjectDTO.getId());
        subject.setName(subjectDTO.getName());
        subject.setTeacherSubjects(subjectDTO.teacherSubjects);
        subject.setUser(subjectDTO.user);
        return subject;
    }
}
