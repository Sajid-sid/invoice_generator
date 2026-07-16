import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../Login/login.css";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      console.log("🔥 Signup clicked");
      console.log(
  "SIGNUP URL:",
  `${import.meta.env.VITE_API_URL}/api/auth/signup`
  
);

console.log("ENV:", import.meta.env.VITE_API_URL);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      );

      const data = await res.json();

      console.log("SIGNUP RESPONSE:", data);

      if (!res.ok) {
        alert(data.message);
        return;
      }

      // success → go to login
      navigate("/");

    } catch (error) {
      console.log("SIGNUP ERROR:", error);
      alert("Server error");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSignup}>
        <h2>Sign Up</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <button type="submit">
          Create Account
        </button>

        <p>
          Already have an account?
          <span onClick={() => navigate("/")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;