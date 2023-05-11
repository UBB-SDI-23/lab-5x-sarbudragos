package com.example.sdilab1.repository;


import com.example.sdilab1.model.Classroom;
import com.example.sdilab1.model.Teacher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TeacherRepository extends JpaRepository<Teacher, Integer> {
    @Query("SELECT u FROM Teacher  u WHERE concat(u.firstName, u.lastName) LIKE concat('%', :name, '%') ")
    Page<Teacher> findAutoComplete(@Param("name") String query, Pageable pageable);
}
