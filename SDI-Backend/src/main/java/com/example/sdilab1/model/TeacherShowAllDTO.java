package com.example.sdilab1.model;

import java.util.Set;

public class TeacherShowAllDTO {
    private Integer id;

    private String firstName;

    private String lastName;


    private Integer age;

    private Double salary;

    private String levelOfEducation;

    private Set<TeacherSubject> teacherSubjects;

    public TeacherShowAllDTO() {
    }

    public TeacherShowAllDTO(Integer id, String firstName, String lastName, Integer age, Double salary, String levelOfEducation, Set<TeacherSubject> teacherSubjects) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.salary = salary;
        this.levelOfEducation = levelOfEducation;
        this.teacherSubjects = teacherSubjects;
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

    public void setLevelOfEducation(String levelOfEducation) {
        this.levelOfEducation = levelOfEducation;
    }

    public Integer getHighestYearsOfExperience() {
        return teacherSubjects.stream().mapToInt(TeacherSubject::getYearsOfExperience).max().orElse(0);
    }

    public static TeacherShowAllDTO fromTeacher(Teacher teacher){
        return new TeacherShowAllDTO(
                teacher.getId(),
                teacher.getFirstName(),
                teacher.getLastName(),
                teacher.getAge(),
                teacher.getSalary(),
                teacher.getLevelOfEducation(),
                teacher.getTeacherSubjects());
    }

    public static Teacher toTeacher(TeacherShowAllDTO teacherDTO){
        Teacher teacher = new Teacher();
        teacher.setId(teacherDTO.getId());
        teacher.setFirstName(teacherDTO.getFirstName());
        teacher.setLastName(teacherDTO.getLastName());
        teacher.setAge(teacherDTO.getAge());
        teacher.setSalary(teacherDTO.getSalary());
        teacher.setLevelOfEducation(teacherDTO.getLevelOfEducation());
        teacher.setTeacherSubjects(teacherDTO.teacherSubjects);

        return teacher;
    }
}
