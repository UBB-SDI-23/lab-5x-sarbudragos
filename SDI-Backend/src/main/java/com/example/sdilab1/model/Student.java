package com.example.sdilab1.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "Students")
public class Student {
    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Integer id;

    @Column
    private String firstName;

    @Column
    private String lastName;
    @Column
    private Integer schoolYear;

    @Column
    private Double averageGrade;

    @Column
    private String specialization;

    @ManyToOne
    @JoinColumn(name="classroom_id")
    @JsonIgnore
    private Classroom classroom;


    public Student(String firstName, String lastName, Integer schoolYear, Double averageGrade, String specialization)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.schoolYear = schoolYear;
        this.averageGrade = averageGrade;
        this.specialization = specialization;
    }

    public Student() {
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
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

    public void setSchoolYear(Integer schoolYear) {
        this.schoolYear = schoolYear;
    }

    public Double getAverageGrade() {
        return averageGrade;
    }

    public void setAverageGrade(Double averageGrade) {
        this.averageGrade = averageGrade;
    }

    @Override
    public boolean equals(Object o) {

        if (this == o)
            return true;
        if (!(o instanceof Student student))
            return false;
        return Objects.equals(this.id, student.id) && Objects.equals(this.firstName, student.firstName) &&
                Objects.equals(this.schoolYear, student.schoolYear) &&
                Objects.equals(this.averageGrade, student.averageGrade);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id, this.firstName, this.schoolYear, this.averageGrade);
    }

    @Override
    public String toString() {
        return "Student{" + "id=" + this.id + ", name='" + this.firstName + '\'' + ", schoolYear='"
                + this.schoolYear + '\''+ ", averageGrade='" + this.averageGrade + '\'' +
                ", classroom='" + this.classroom + '\'' +'}';
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public Classroom getClassroom() {
        return classroom;
    }

    public void setClassroom(Classroom classroom) {
        this.classroom = classroom;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
