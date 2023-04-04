package com.example.sdilab1.model;

import java.util.Set;

public class SubjectDTO {
    private Integer id;

    private String name;

    Set<TeacherSubject> teacherSubjects;

    public SubjectDTO(){
    }

    public SubjectDTO(Integer id ,String name){
        this.id = id;
        this.name = name;
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

    public static SubjectDTO fromSubject(Subject subject){
        return new SubjectDTO(
                subject.getId(),
                subject.getName()
        );
    }

    public static Subject toSubject(SubjectDTO subjectDTO){
        Subject subject = new Subject();
        subject.setId(subjectDTO.getId());
        subject.setName(subjectDTO.getName());

        return subject;
    }
}
