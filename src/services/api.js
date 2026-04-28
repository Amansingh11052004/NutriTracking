const BASE_URL = "http://localhost:8080";

// 🔐 SIGNUP
export const signup = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Signup failed");
  return res.text();
};

// 🔐 LOGIN
export const login = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.text();
};

// 🍔 FOOD DETECTION
export const detectFood = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${BASE_URL}/food/detect`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Food detection failed");
  return res.text();
};

// 📊 GET FOOD DATA
export const getFoodData = async (foodName) => {
  const res = await fetch(`${BASE_URL}/food/get?name=${foodName}`);

  if (!res.ok) throw new Error("Food data fetch failed");
  return res.json();
};

// ➕ ADD FOOD LOG
export const addFoodLog = async (data) => {
  const res = await fetch(`${BASE_URL}/log/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to add food log");
};

// 📅 TODAY LOGS
export const getTodayLogs = async () => {
  const res = await fetch(`${BASE_URL}/log/today`);

  if (!res.ok) throw new Error("Failed to fetch today logs");
  return res.json();
};

// 🤖 AI SUGGESTION
export const getSuggestion = async () => {
  const res = await fetch(`${BASE_URL}/health/suggestion`);

  if (!res.ok) throw new Error("Failed to fetch suggestion");
  return res.text();
};

// 📈 WEEKLY DATA
export const getWeeklyData = async () => {
  const res = await fetch(`${BASE_URL}/log/weekly`);

  if (!res.ok) throw new Error("Failed to fetch weekly data");
  return res.json();
};