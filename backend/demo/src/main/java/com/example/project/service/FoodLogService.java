package com.example.project.service;

import com.example.project.model.FoodLog;
import com.example.project.repository.FoodLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.LinkedHashMap;

@Service
public class FoodLogService {

    @Autowired
    private FoodLogRepository repo;

    // SAVE FOOD
    public void save(FoodLog log) {
        log.setDate(LocalDate.now());
        repo.save(log);
    }
    // 🔥 CLEAR ALL LOGS
    public void clearAllLogs() {
        repo.deleteAll();
    }

    // TODAY LOGS
    public List<FoodLog> getTodayLogs() {
        return repo.findByDate(LocalDate.now());
    }

    // WEEKLY DATA (CALORIES + PROTEIN + FAT + CARBS)
    public Map<String, Map<String, Double>> getWeeklyData() {

        LocalDate today = LocalDate.now();
        LocalDate start = today.minusDays(6);

        List<FoodLog> logs = repo.findByDateBetween(start, today);

        Map<String, Map<String, Double>> result = new LinkedHashMap<>();

        // initialize 7 days
        for (int i = 0; i < 7; i++) {
            LocalDate date = start.plusDays(i);

            Map<String, Double> day = new HashMap<>();
            day.put("calories", 0.0);
            day.put("protein", 0.0);
            day.put("fat", 0.0);
            day.put("carbs", 0.0);

            result.put(date.toString(), day);
        }

        // fill values
        for (FoodLog log : logs) {
            String date = log.getDate().toString();

            Map<String, Double> day = result.get(date);

            if (day != null) {
                day.put("calories", day.get("calories") + log.getCalories());
                day.put("protein", day.get("protein") + log.getProtein());
                day.put("fat", day.get("fat") + log.getFat());
                day.put("carbs", day.get("carbs") + log.getCarbs());
            }
        }

        return result;
    }
}