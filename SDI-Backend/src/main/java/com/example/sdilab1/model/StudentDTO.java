package com.example.sdilab1.model;


public class StudentDTO {

    private Integer id;
    private String firstName;

    private String lastName;
    private Integer schoolYear;
    private Double averageGrade;
    private String specialization;
    private Classroom classroom;

    public StudentDTO(Integer id,String firstName, String lastName, Integer schoolYear, Double averageGrade, String specialization, Classroom classroom) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.schoolYear = schoolYear;
        this.averageGrade = averageGrade;
        this.specialization = specialization;
        this.classroom = classroom;
    }

    public StudentDTO() {
    }

    public Classroom getClassroom() {
        return classroom;
    }

    public void setClassroom(Classroom classroom) {
        this.classroom = classroom;
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

    public static StudentDTO fromStudent(Student student) {
        return new StudentDTO(
                Math.toIntExact(student.getId()),
                student.getFirstName(),
                student.getLastName(),
                student.getSchoolYear(),
                student.getAverageGrade(),
                student.getSpecialization(),
                student.getClassroom()
        );
    }

    public static Student toStudent(StudentDTO studentDTO) {
        Student student = new Student();
        student.setFirstName(studentDTO.getFirstName());
        student.setLastName(studentDTO.getLastName());
        student.setAverageGrade(studentDTO.getAverageGrade());
        student.setSchoolYear(studentDTO.getSchoolYear());
        student.setSpecialization(studentDTO.getSpecialization());
        student.setClassroom(studentDTO.getClassroom());
        return student;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}

