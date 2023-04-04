package com.example.sdilab1.model;

import java.util.List;

public class ClassroomDTO {
    private Integer id;
    private String name;
    private String location;

    private Integer capacity;

    private String homeroomTeacher;

    private Double allocatedFunds;

    public ClassroomDTO() {
    }

    public ClassroomDTO(Integer id, String name, String location, Integer capacity, String homeroomTeacher, Double allocatedFunds, List<Student> students) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.capacity = capacity;
        this.homeroomTeacher = homeroomTeacher;
        this.allocatedFunds = allocatedFunds;
        this.students = students;
    }

    List<Student> students;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }

    public static ClassroomDTO fromClassroom(Classroom classroom){
        return new ClassroomDTO(
                classroom.getId(),
                classroom.getName(),
                classroom.getLocation(),
                classroom.getCapacity(),
                classroom.getHomeroomTeacher(),
                classroom.getAllocatedFunds(),
                classroom.getStudents()
        );
    }

    public static Classroom toClassroom(ClassroomDTO classroomDTO){
        Classroom classroom = new Classroom();
        classroom.setId(classroomDTO.getId());
        classroom.setLocation(classroomDTO.getLocation());
        classroom.setName(classroomDTO.getName());
        classroom.setCapacity(classroomDTO.getCapacity());
        classroom.setHomeroomTeacher(classroomDTO.getHomeroomTeacher());
        classroom.setAllocatedFunds(classroomDTO.getAllocatedFunds());

        return classroom;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public String getHomeroomTeacher() {
        return homeroomTeacher;
    }

    public void setHomeroomTeacher(String homeroomTeacher) {
        this.homeroomTeacher = homeroomTeacher;
    }

    public Double getAllocatedFunds() {
        return allocatedFunds;
    }

    public void setAllocatedFunds(Double allocatedFunds) {
        this.allocatedFunds = allocatedFunds;
    }
}
