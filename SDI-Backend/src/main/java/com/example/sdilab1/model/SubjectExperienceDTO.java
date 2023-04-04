package com.example.sdilab1.model;

public class SubjectExperienceDTO {
    private Integer id;

    private String name;

    private Double experience;

    public SubjectExperienceDTO(){
    }

    public SubjectExperienceDTO(Integer id , String name, Double experience){
        this.id = id;
        this.name = name;
        this.experience = experience;
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

    public static SubjectExperienceDTO fromSubject(Subject subject, Double experience){
        return new SubjectExperienceDTO(
                subject.getId(),
                subject.getName(),
                experience
        );
    }

    public static Subject toSubject(SubjectSalaryDTO subjectSalaryDTO){
        Subject subject = new Subject();
        subject.setId(subjectSalaryDTO.getId());
        subject.setName(subjectSalaryDTO.getName());

        return subject;
    }

    public Double getExperience() {
        return experience;
    }

    public void setExperience(Double experience) {
        this.experience = experience;
    }
}
