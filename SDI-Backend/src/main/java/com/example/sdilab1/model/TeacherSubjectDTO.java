package com.example.sdilab1.model;

public class TeacherSubjectDTO {
    private Integer Id;

    Teacher teacher;

    Subject subject;


    private Integer yearsOfExperience;


    private String teachingDegree;

    public TeacherSubjectDTO(Integer id,Teacher teacher, Subject subject, Integer yearsOfExperience, String teachingDegree){
        this.Id=id;
        this.teacher=teacher;
        this.subject=subject;
        this.yearsOfExperience = yearsOfExperience;
        this.teachingDegree = teachingDegree;
    }

    public TeacherSubjectDTO() {

    }

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public Integer getYearsOfExperience() {
        return yearsOfExperience;
    }

    public void setYearsOfExperience(Integer yearsOfExperience) {
        this.yearsOfExperience = yearsOfExperience;
    }

    public String getTeachingDegree() {
        return teachingDegree;
    }

    public void setTeachingDegree(String teachingDegree) {
        this.teachingDegree = teachingDegree;
    }

    public static TeacherSubjectDTO fromTeacherSubject(TeacherSubject teacherSubject){
        return new TeacherSubjectDTO(
                teacherSubject.getId(),
                teacherSubject.getTeacher(),
                teacherSubject.getSubject(),
                teacherSubject.getYearsOfExperience(), teacherSubject.getTeachingDegree());
    }

    public static TeacherSubject toTeacherSubject(TeacherSubjectDTO teacherSubjectDTO){
        TeacherSubject teacherSubject = new TeacherSubject();
        teacherSubject.setTeacher(teacherSubjectDTO.getTeacher());
        teacherSubject.setSubject(teacherSubjectDTO.getSubject());
        teacherSubject.setTeachingDegree(teacherSubjectDTO.getTeachingDegree());
        teacherSubject.setYearsOfExperience(teacherSubjectDTO.getYearsOfExperience());

        return teacherSubject;
    }

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }
}
