package com.example.sdilab1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@Entity
@NoArgsConstructor
@Table(name = "UserProfiles")
public class UserProfile {
    private @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) Integer id;

    @OneToOne(mappedBy = "userProfile", cascade = CascadeType.ALL)
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
}
