package com.example.vit_semester_result.repository;

import com.example.vit_semester_result.entity.StudentResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentResultRepository extends JpaRepository<StudentResult, Long> {
}