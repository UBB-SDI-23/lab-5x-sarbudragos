package com.example.sdilab1.model;


public class TeacherDTO {
    private Integer id;

    private String firstName;

    private String lastName;


    private Integer age;

    private Double salary;

    private String levelOfEducation;

    public TeacherDTO() {
    }

    public TeacherDTO(Integer id, String firstName, String lastName, Integer age, Double salary, String levelOfEducation) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.salary = salary;
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

    public void setLevelOfEducation(String levelOfEducation) {
        this.levelOfEducation = levelOfEducation;
    }

    public static TeacherDTO fromTeacher(Teacher teacher){
        return new TeacherDTO(
                teacher.getId(),
                teacher.getFirstName(),
                teacher.getLastName(),
                teacher.getAge(),
                teacher.getSalary(),
                teacher.getLevelOfEducation()
        );
    }

    public static Teacher toTeacher(TeacherDTO teacherDTO){
        Teacher teacher = new Teacher();
        teacher.setId(teacherDTO.getId());
        teacher.setFirstName(teacherDTO.getFirstName());
        teacher.setLastName(teacherDTO.getLastName());
        teacher.setAge(teacherDTO.getAge());
        teacher.setSalary(teacherDTO.getSalary());
        teacher.setLevelOfEducation(teacherDTO.getLevelOfEducation());

        return teacher;
    }
}
