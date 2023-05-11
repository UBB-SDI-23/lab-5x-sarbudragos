package com.example.sdilab1.repository;

import com.example.sdilab1.model.Classroom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClassroomRepository extends JpaRepository<Classroom, Integer> {
    @Query(value = "SELECT * FROM Classrooms e ORDER BY e.id LIMIT 10", nativeQuery=true)
    List<Classroom> findTop100ById();

    @Query("SELECT u FROM Classroom  u WHERE u.name LIKE concat('%', :name, '%') ")
    Page<Classroom> findAutoComplete(@Param("name") String query, Pageable pageable);
}
