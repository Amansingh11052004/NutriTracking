package com.example.project.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;


import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

@Service
public class FoodDataService {

    private Map<String, Map<String, Object>> foodData = new HashMap<>();

    public FoodDataService() {
        loadFoodData();
    }

    private void loadFoodData() {
        try {
            ObjectMapper mapper = new ObjectMapper();

            InputStream inputStream = getClass()
                    .getClassLoader()
                    .getResourceAsStream("foods.json");

            if (inputStream == null) {
                System.out.println("❌ foods.json NOT FOUND");
                return;
            }

            foodData = mapper.readValue(inputStream,
                    new TypeReference<Map<String, Map<String, Object>>>() {});

            System.out.println("✅ Food data loaded successfully");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Map<String, Object> getFoodData(String food) {

        food = food.toLowerCase().trim();

        // 🔥 handle common variations
        if (food.equals("chowmin")) food = "chowmein";
        if (food.equals("icecream")) food = "ice cream";
        if (food.equals("colddrink")) food = "cold drink";

        if (foodData.containsKey(food)) {
            Map<String, Object> result = new HashMap<>(foodData.get(food));
            result.put("food", food);
            return result;
        }

        return Map.of("food", "unknown", "calories", 0, "protein", 0, "fat", 0, "carbs", 0);
    }
}