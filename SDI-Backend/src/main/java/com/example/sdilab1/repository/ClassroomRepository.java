package com.example.sdilab1.repository;

import com.example.sdilab1.model.Classroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClassroomRepository extends JpaRepository<Classroom, Integer> {
    @Query(value = "SELECT * FROM Classrooms e ORDER BY e.id LIMIT 10", nativeQuery=true)
    List<Classroom> findTop100ById();
}
