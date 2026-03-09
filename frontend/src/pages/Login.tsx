import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Login() {

      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");

      const navigate = useNavigate();

      const handleLogin = async () => {

            try {

                  const res = await API.post("/auth/login", {
                        email,
                        password
                  });

                  localStorage.setItem("token", res.data.token);

                  navigate("/dashboard");

            } catch (error) {
                  alert("Invalid login credentials");
            }

      };

      return (
            <div className="login-card"  style={{ width: "300px", margin: "100px auto" }}>

                  <h2>Merchant Login</h2>

                  <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                  />

                  <br /><br />

                  <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                  />

                  <br /><br />

                  <button onClick={handleLogin}>
                        Login
                  </button>

            </div>
      );
}

export default Login;