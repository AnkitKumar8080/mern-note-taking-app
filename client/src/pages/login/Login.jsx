import { Link } from "react-router-dom";
import "./login.css";
import { useContext, useRef, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function Login() {
  const userRef = useRef();
  const passRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [invalidUser, setInvalidUser] = useState(false);
  const [isHide, setIsHide] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/api/auth/login", {
        email: userRef.current.value,
        password: passRef.current.value,
      });
      !res.data && setInvalidUser(true);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  return (
    <div className="login">
      <div className="logContainer">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
          {invalidUser && (
            <span style={{ color: "red" }}>Invalid username or password</span>
          )}
          <div className="luser lDiv">
            <label>email</label>
            <input
              type="email"
              autoComplete="email"
              className="loginInput"
              ref={userRef}
            />
          </div>

          <div className="lpass lDiv">
            <label>Password</label>
            <input
              ref={passRef}
              type={isHide ? "text" : "password"}
              className="loginInput passInput"
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
          <button className="loginButton" type="submit" disabled={isFetching}>
            Login
          </button>
          <span>or</span>
          <Link className="Link" to={"/register"}>
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}
