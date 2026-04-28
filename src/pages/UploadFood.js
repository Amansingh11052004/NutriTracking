import { useState } from "react";
import { getFoodData, addFoodLog } from "../services/api";
import "../styles/upload.css";

function UploadFood() {
  const [food, setFood] = useState("");
  const [quantity, setQuantity] = useState(100);
  const [result, setResult] = useState(null);

  const handleGet = async () => {
    if (!food.trim()) {
      alert("Enter food name");
      return;
    }

    try {
      const data = await getFoodData(food.trim());

      const factor = quantity / 100;

      setResult({
        food: data.food,
        calories: (data.calories * factor).toFixed(1),
        protein: (data.protein * factor).toFixed(1),
        fat: (data.fat * factor).toFixed(1),
        carbs: (data.carbs * factor).toFixed(1),
      });
    } catch {
      alert("Food not found");
    }
  };

  const handleAdd = async () => {
    if (!result) return;

    try {
      await addFoodLog(result);
      alert("Added to dashboard!");
      setResult(null);
      setFood("");
      setQuantity(100);
    } catch {
      alert("Failed to add");
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-wrapper">

        {/* LEFT */}
        <div className="upload-card">
          <h2>Add Your Meal</h2>

          <input
            type="text"
            placeholder="Enter food (e.g. pizza)"
            value={food}
            onChange={(e) => setFood(e.target.value)}
          />

          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <button onClick={handleGet}>
            Get Nutrition
          </button>
        </div>

        {/* RIGHT */}
        <div className="result-card">
          {result ? (
            <>
              <h3>{result.food}</h3>

              <div className="result-grid">
                <div>{result.calories} kcal</div>
                <div>{result.protein} g</div>
                <div>{result.fat} g</div>
                <div>{result.carbs} g</div>
              </div>

              <button className="add-btn" onClick={handleAdd}>
                Add to Dashboard
              </button>
            </>
          ) : (
            <p className="placeholder">Enter food to see nutrition</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default UploadFood;