package com.example.sdilab1.model;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class StudentShowAllDTO {
    private Integer id;
    private String firstName;

    private String lastName;
    private Integer schoolYear;
    private Double averageGrade;
    private String specialization;
    private Classroom classroom;

    private User user;


    public String getClassroom() {
        return classroom.getName();
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

    public void setFirstName(String name) {
        this.firstName = name;
    }


    public Integer getSchoolYear() {
        return schoolYear;
    }

    public void setSchoolYear(Integer year) {
        this.schoolYear = year;
    }

    public Double getAverageGrade() {
        return averageGrade;
    }

    public void setAverageGrade(Double price) {
        this.averageGrade = price;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }



    public static StudentShowAllDTO fromStudent(Student student) {
        return new StudentShowAllDTO(
                student.getId(),
                student.getFirstName(),
                student.getLastName(),
                student.getSchoolYear(),
                student.getAverageGrade(),
                student.getSpecialization(),
                student.getClassroom(),
                student.getUser()
        );
    }

    public static Student toStudent(StudentShowAllDTO studentDTO) {
        Student student = new Student();
        student.setFirstName(studentDTO.getFirstName());
        student.setLastName(studentDTO.getLastName());
        student.setAverageGrade(studentDTO.getAverageGrade());
        student.setSchoolYear(studentDTO.getSchoolYear());
        student.setSpecialization(studentDTO.getSpecialization());
        student.setClassroom(studentDTO.classroom);
        return student;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
