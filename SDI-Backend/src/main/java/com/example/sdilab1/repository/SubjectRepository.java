package com.example.sdilab1.repository;

import com.example.sdilab1.model.Classroom;
import com.example.sdilab1.model.Subject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SubjectRepository extends JpaRepository<Subject, Integer> {
    @Query("SELECT u FROM Subject  u WHERE u.name LIKE concat('%', :name, '%') ")
    Page<Subject> findAutoComplete(@Param("name") String query, Pageable pageable);
}
