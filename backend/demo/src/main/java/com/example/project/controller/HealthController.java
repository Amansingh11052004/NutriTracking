package com.example.project.controller;

import com.example.project.model.FoodLog;
import com.example.project.service.FoodLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/health")
@CrossOrigin(origins = "*")
public class HealthController {

    @Autowired
    private FoodLogService service;

    @GetMapping("/suggestion")
    public String getSuggestion() {

        List<FoodLog> logs = service.getTodayLogs();

        double calories = 0, protein = 0;

        for (FoodLog log : logs) {
            calories += log.getCalories();
            protein += log.getProtein();
        }

        // 🔥 BASIC LOGIC
        if (calories > 2200) {
            return "⚠️ High calorie intake. Try lighter meals.";
        }

        if (protein < 50) {
            return "💪 Increase protein intake (eggs, paneer, chicken).";
        }

        if (calories < 1200) {
            return "⚠️ You are eating too less. Increase intake.";
        }

        return "✅ Good balance! Keep it up.";
    }
}