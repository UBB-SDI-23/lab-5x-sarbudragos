package com.example.sdilab1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;


import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "Classrooms")
public class Classroom {
    private @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) Integer id;

    public Integer getId() {
        return id;
    }

    @Column
    private String name;

    private String location;

    private Integer capacity;

    private String HomeroomTeacher;

    private Double allocatedFunds;

    @OneToMany(mappedBy = "classroom")
    @JsonIgnore
    private List<Student> students = new ArrayList<>();


    public Classroom() {
    }

    public Classroom(String name, String location, Integer capacity, String homeroomTeacher, Double allocatedFunds){
        this.name=name;
        this.location = location;
        this.capacity = capacity;
        HomeroomTeacher = homeroomTeacher;
        this.allocatedFunds = allocatedFunds;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }



    @Override
    public boolean equals(Object o) {

        if (this == o)
            return true;
        if (!(o instanceof Classroom classroom))
            return false;
        return Objects.equals(this.id, classroom.id) && Objects.equals(this.name, classroom.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id, this.name);
    }

    @Override
    public String toString() {
        return "Classroom{" + "id=" + this.id + ", name='" + this.name + '\'' + ", students='"
                 + '\'' + '}';
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public String getHomeroomTeacher() {
        return HomeroomTeacher;
    }

    public void setHomeroomTeacher(String homeroomTeacher) {
        HomeroomTeacher = homeroomTeacher;
    }

    public Double getAllocatedFunds() {
        return allocatedFunds;
    }

    public void setAllocatedFunds(Double allocatedFunds) {
        this.allocatedFunds = allocatedFunds;
    }
}
