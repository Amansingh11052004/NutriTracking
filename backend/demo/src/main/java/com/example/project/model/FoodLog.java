package com.example.project.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class FoodLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String food;
    private double calories;
    private double protein;
    private double fat;
    private double carbs;

    private LocalDate date;

    // getters & setters

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getFood() { return food; }
    public void setFood(String food) { this.food = food; }

    public double getCalories() { return calories; }
    public void setCalories(double calories) { this.calories = calories; }

    public double getProtein() { return protein; }
    public void setProtein(double protein) { this.protein = protein; }

    public double getFat() { return fat; }
    public void setFat(double fat) { this.fat = fat; }

    public double getCarbs() { return carbs; }
    public void setCarbs(double carbs) { this.carbs = carbs; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
}