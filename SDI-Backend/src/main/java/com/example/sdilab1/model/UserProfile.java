package com.example.sdilab1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name = "UserProfiles")
public class UserProfile {
    private @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) Integer id;

    @OneToOne(mappedBy = "userProfile")
    @JsonIgnore
    private User user;

    @Column
    private String bio;

    @Column
    private String location;

    @Column
    private Date birthday;

    @Column
    private String gender;

    @Column(name = "maritalStatus")
    private String maritalStatus;

    public UserProfile(String bio, String location, Date birthday, String gender, String maritalStatus) {
        this.bio = bio;
        this.location = location;
        this.birthday = birthday;
        this.gender = gender;
        this.maritalStatus = maritalStatus;
    }

    public UserProfile() {

    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
