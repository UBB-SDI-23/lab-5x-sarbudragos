package com.example.sdilab1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity
@Table(name = "Users")
public class User {
    private @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) Integer id;

    @Column
    private String username;

    @Column
    private String password;

    @OneToOne
    @JsonIgnore
    @JoinColumn(name="userProfile_id", referencedColumnName = "id")
    private UserProfile userProfile;

    private transient BCryptPasswordEncoder passwordEncoder;

    public User(String username, String password) {
        this.username = username;
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.password = passwordEncoder.encode(password);
    }

    public User() {

    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = passwordEncoder.encode(password);
    }

    public UserProfile getUserProfile() {
        return userProfile;
    }

    public void setUserProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
    }
}
