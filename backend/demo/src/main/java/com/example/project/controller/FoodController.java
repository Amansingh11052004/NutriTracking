package com.example.project.controller;

import com.example.project.service.FoodDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/food")
@CrossOrigin(origins = "http://localhost:3000")
public class FoodController {

    @Autowired
    private FoodDataService foodService;

    @GetMapping("/get")
    public Object getFood(@RequestParam String name) {
        return foodService.getFoodData(name);
    }
}