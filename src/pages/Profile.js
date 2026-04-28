import { useState, useEffect } from "react";
import "../styles/profile.css";

function Profile() {
  const [form, setForm] = useState({
    age: "",
    gender: "male",
    height: "",
    weight: "",
    activity: "moderate",
    disease: ""
  });

  const [result, setResult] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("profile");
    if (saved) {
      const parsed = JSON.parse(saved);
      setForm(parsed);
      setResult({
        bmi: parsed.bmi,
        calories: parsed.calories,
        protein: parsed.protein
      });
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 CALCULATE FUNCTION
  const calculate = () => {
    const { height, weight, activity } = form;

    if (!height || !weight) {
      alert("Enter height and weight");
      return;
    }

    const h = height / 100;
    const bmi = (weight / (h * h)).toFixed(1);

    let calories = weight * 24;

    if (activity === "low") calories *= 1.2;
    else if (activity === "moderate") calories *= 1.5;
    else calories *= 1.8;

    const protein = (weight * 1.2).toFixed(1);

    const updatedProfile = {
      ...form,
      bmi,
      calories: calories.toFixed(0),
      protein
    };

    setResult({
      bmi,
      calories: calories.toFixed(0),
      protein
    });

    localStorage.setItem("profile", JSON.stringify(updatedProfile));
  };

  // 🔥 RESET FUNCTION (CORRECT PLACE)
  const handleReset = () => {
    localStorage.removeItem("profile");

    setForm({
      age: "",
      gender: "male",
      height: "",
      weight: "",
      activity: "moderate",
      disease: ""
    });

    setResult(null);
  };

  return (
    <div className="profile-container">

      {/* LEFT FORM */}
      <div className="profile-card">
        <h2>👤 Profile</h2>

        <input name="age" placeholder="Age" onChange={handleChange} value={form.age} />

        <select name="gender" onChange={handleChange} value={form.gender}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input name="height" placeholder="Height (cm)" onChange={handleChange} value={form.height} />
        <input name="weight" placeholder="Weight (kg)" onChange={handleChange} value={form.weight} />

        <select name="activity" onChange={handleChange} value={form.activity}>
          <option value="low">Low Activity</option>
          <option value="moderate">Moderate</option>
          <option value="high">High Activity</option>
        </select>

        <input name="disease" placeholder="Disease (optional)" onChange={handleChange} value={form.disease} />

        <button onClick={calculate}>Save & Calculate</button>

        {/* 🔥 RESET BUTTON */}
        <button onClick={handleReset} className="reset-btn">
          Reset Profile
        </button>
      </div>

      {/* RIGHT RESULT */}
      <div className="profile-result">
        {result ? (
          <>
            <h3>Health Summary</h3>

            <div className="result-box">
              <p>BMI: <strong>{result.bmi}</strong></p>
              <p>Daily Calories: <strong>{result.calories} kcal</strong></p>
              <p>Protein Need: <strong>{result.protein} g</strong></p>
            </div>
          </>
        ) : (
          <p className="placeholder">Fill details to see results</p>
        )}
      </div>

    </div>
  );
}

export default Profile;