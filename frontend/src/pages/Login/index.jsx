import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";

function Login() {
  const [register, setRegister] = useState(false);
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    console.log(formdata);
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        formdata
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log(formdata);
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        formdata
      );
      console.log(response.data);
      navigate("/landing");
    } catch (e) {
      console.log(e);
    }
  };

  const handleToggleRegister = () => {
    setRegister(!register);
  };

  return (
    <div className="login flex center full-height">
      {register ? (
        <form
          onSubmit={handleRegister}
          className="flex column gap center login-form"
        >
          <div>
            <h2>Register</h2>
          </div>
          <div>
            <input
              type="text"
              className="input"
              name="fname"
              placeholder="First Name"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              className="input"
              name="lname"
              placeholder="Last Name"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="username"
              className="input"
              placeholder="Username"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className="input"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <div className="flex gap">
            <input
              name="admin"
              className="input"
              type="checkbox"
              onChange={handleChange}
            />
            <label>Admin</label>
          </div>

          <button className="btn" type="submit">
            Register
          </button>
          <p>Already have an account?</p>
          <button className="btn" onClick={handleToggleRegister}>
            Login
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleLogin}
          className="flex column center gap  login-form"
        >
          <div>
            <h2>Login</h2>
          </div>
          <div>
            <input
              type="text"
              className="input"
              placeholder="Username"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              className="input"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <div>
            <button className="btn" onClick={handleLogin}>
              Login
            </button>
          </div>
          <div>
            <p>Don't have an account?</p>
          </div>
          <div>
            <button className="btn" onClick={handleToggleRegister}>
              Register
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Login;
