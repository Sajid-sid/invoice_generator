import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    console.log("LOGIN RESPONSE:", data);

    if (!res.ok) {
      alert(data.message);
      return;
    }

    // Save token and user in localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    console.log("Saved Token:", localStorage.getItem("token"));
console.log("TOKEN BEFORE DASHBOARD:", data.token);
console.log("LOCAL STORAGE:", localStorage.getItem("token"));
    // Navigate to dashboard
    navigate("/dashboard");

  } catch (error) {
    console.log("LOGIN ERROR:", error);
    alert("Server error");
  }
};

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <p>
          Don't have an account?
          <span onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;