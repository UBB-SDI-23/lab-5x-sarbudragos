package com.example.sdilab1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Users")
public class User implements UserDetails {
    private @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) Integer id;

    @Column
    private String username;

    @Column
    private String password;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="userProfile_id", referencedColumnName = "id")
    private UserProfile userProfile;


    @Enumerated(EnumType.STRING)
    private Role role;

    @JsonIgnore
    @Column(name = "is_active")
    private Boolean isActive;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Classroom> classrooms;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Student> students;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Teacher> teachers;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Subject> subjects;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<TeacherSubject> teacherSubjects;

    @Column(name = "items_per_page")
    private Integer itemsPerPage;

    public String getUsername() {
        return username;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isEnabled() {
        return isActive;
    }

    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

}
