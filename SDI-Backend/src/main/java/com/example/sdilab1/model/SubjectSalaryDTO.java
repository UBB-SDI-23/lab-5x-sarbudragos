package com.example.sdilab1.model;

public class SubjectSalaryDTO {
    private Integer id;

    private String name;

    private Double salary;

    public SubjectSalaryDTO(){
    }

    public SubjectSalaryDTO(Integer id , String name, Double salary){
        this.id = id;
        this.name = name;
        this.salary = salary;
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

    public static SubjectSalaryDTO fromSubject(Subject subject, Double salary){
        return new SubjectSalaryDTO(
                subject.getId(),
                subject.getName(),
                salary
        );
    }

    public static Subject toSubject(SubjectSalaryDTO subjectSalaryDTO){
        Subject subject = new Subject();
        subject.setId(subjectSalaryDTO.getId());
        subject.setName(subjectSalaryDTO.getName());

        return subject;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }
}
