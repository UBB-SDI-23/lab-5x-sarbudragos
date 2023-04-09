package com.example.sdilab1.model;

import jakarta.persistence.*;

@Entity
@Table(name = "TeacherSubject")
public class TeacherSubject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    Teacher teacher;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    Subject subject;

    @Column
    private Integer yearsOfExperience;

    @Column
    private String teachingDegree;

    public TeacherSubject(Teacher teacher, Subject subject, Integer yearsOfExperience, String teachingDegree){
        this.teacher=teacher;
        this.subject=subject;
        this.yearsOfExperience = yearsOfExperience;
        this.teachingDegree = teachingDegree;
    }

    public TeacherSubject() {

    }

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public Integer getYearsOfExperience() {
        return yearsOfExperience;
    }

    public void setYearsOfExperience(Integer yearsOfExperience) {
        this.yearsOfExperience = yearsOfExperience;
    }

    public String getTeachingDegree() {
        return teachingDegree;
    }

    public void setTeachingDegree(String teachingDegree) {
        this.teachingDegree = teachingDegree;
    }
}
