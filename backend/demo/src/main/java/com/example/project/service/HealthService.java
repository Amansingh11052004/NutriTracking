package com.example.project.service;

import com.example.project.model.FoodLog;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HealthService {

    public String generateSuggestion(List<FoodLog> logs) {

        double totalCalories = 0;
        double totalProtein = 0;
        double totalCarbs = 0;

        for (FoodLog log : logs) {
            totalCalories += log.getCalories();
            totalProtein += log.getProtein();
            totalCarbs += log.getCarbs();
        }

        if (totalCalories > 2200) {
            return "⚠️ You are consuming too many calories. Try to reduce intake.";
        }

        if (totalProtein < 50) {
            return "💪 Increase protein intake (eggs, paneer, chicken).";
        }

        if (totalCarbs > 300) {
            return "🍞 High carb intake. Try balancing with protein.";
        }

        return "✅ Great job! Your diet looks balanced.";
    }
}