import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHide, setIsHide] = useState(false);
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        "/api/auth/register",
        {
          username,
          password,
          email,
        },
        config
      );
      res.data && window.location.replace("/login");
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div className="register">
      <div className="regCotainer">
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={handleSubmit}>
          <div className="ruser rDiv">
            <label>Username</label>
            <input
              type="text"
              className="registerInput"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="remail rDiv">
            <label>Email</label>
            <input
              type="text"
              className="registerInput"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="rpass rDiv">
            <label>Password</label>
            <input
              type={isHide ? "text" : "password"}
              className="registerInput passInput"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              id="password-field"
            />
            {!isHide ? (
              <AiFillEyeInvisible
                className="phide"
                onClick={() => setIsHide(!isHide)}
              />
            ) : (
              <AiFillEye className="phide" onClick={() => setIsHide(!isHide)} />
            )}
          </div>
          <button className="registerButton" type="submit">
            Register
          </button>

          {error && (
            <error
              style={{ color: "red", marginTop: "10px", textAlign: "center" }}
            >
              Something went wrong!
            </error>
          )}
        </form>
      </div>
    </div>
  );
}
