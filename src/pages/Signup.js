import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api";
import "../styles/login.css";

function Signup() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = async () => {
    console.log(user);

    if (!user.name || !user.email || !user.password) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await signup(user);
      alert(res);
      navigate("/");
    } catch (error) {
      alert("Error connecting backend");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Create Account</h2>
        <p className="subtitle">Start your health journey</p>

        <input
          placeholder="Full Name"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />

        <input
          placeholder="Email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button onClick={handleSignup}>Sign Up</button>

        <p className="bottom-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;