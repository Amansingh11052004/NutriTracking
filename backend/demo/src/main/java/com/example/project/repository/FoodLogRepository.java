package com.example.project.repository;

import com.example.project.model.FoodLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface FoodLogRepository extends JpaRepository<FoodLog, Integer> {

    List<FoodLog> findByDate(LocalDate date);

    // 🔥 NEW (weekly data)
    List<FoodLog> findByDateBetween(LocalDate start, LocalDate end);
}