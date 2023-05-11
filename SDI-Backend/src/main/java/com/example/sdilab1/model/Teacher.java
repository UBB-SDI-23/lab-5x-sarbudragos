package com.example.sdilab1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Set;


@Entity
@Table(name = "Teachers")
public class Teacher {
    private @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) Integer id;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column
    private Integer age;

    @Column
    private Double salary;

    @Column
    private String levelOfEducation;

    @OneToMany(mappedBy = "teacher")
    @JsonIgnore
    Set<TeacherSubject> teacherSubjects;

    @ManyToOne
    @JoinColumn(name="user_id")
    @JsonIgnore
    private User user;

    public Teacher() {
    }

    public Teacher(String firstName, String lastName, Integer age, Double salary, String levelOfEducation) {
        this.firstName=firstName;
        this.lastName=lastName;
        this.age=age;
        this.salary=salary;
        this.levelOfEducation = levelOfEducation;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getLevelOfEducation() {
        return levelOfEducation;
    }

    public void setLevelOfEducation(String subject) {
        this.levelOfEducation = subject;
    }

    public Set<TeacherSubject> getTeacherSubjects() {
        return teacherSubjects;
    }

    public void setTeacherSubjects(Set<TeacherSubject> teacherSubjects) {
        this.teacherSubjects = teacherSubjects;
    }
}
