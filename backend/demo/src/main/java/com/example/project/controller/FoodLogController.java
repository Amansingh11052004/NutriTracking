package com.example.project.controller;

import com.example.project.model.FoodLog;
import com.example.project.service.FoodLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/log")
@CrossOrigin(origins = "*")
public class FoodLogController {

    @Autowired
    private FoodLogService service;

    // ➕ ADD FOOD
    @PostMapping("/add")
    public String addFood(@RequestBody FoodLog log) {
        service.save(log);
        return "Saved";
    }

    // 📅 TODAY LOGS
    @GetMapping("/today")
    public List<FoodLog> getToday() {
        return service.getTodayLogs();
    }

    // 📈 WEEKLY DATA
    @GetMapping("/weekly")
    public Map<String, Map<String, Double>> getWeekly() {
        return service.getWeeklyData();
    }
    // 🔥 CLEAR ALL FOOD LOGS (RESET DASHBOARD)
    @DeleteMapping("/clear")
    public String clearLogs() {
        service.clearAllLogs();
        return "All logs cleared";
    }
}