import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);
  const [register, setRegister] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "auth/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("jwt", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        if (res.data.user.admin) {
          navigate("/landing-admin");
        } else {
          navigate("/landing");
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Invalid Username or Password!");
      });
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleToggleRegister = () => {
    setRegister(!register);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleAdminChange = (e) => {
    setAdmin(e.target.checked);
  };

  const handleRegister = () => {
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "auth/register", {
        fname: firstName,
        lname: lastName,
        username: username,
        password: password,
      })
      .then((res) => {
        setRegister(false);
      })
      .catch((e) => {
        console.log(e);
        alert("Please Try Again!");
      });
  };

  return (
    <div className="login flex center full-height">
      {register ? (
        <div className="flex column gap center  login-form">
          <div>
            <h2>Register</h2>
          </div>
          <div>
            <input
              type="text"
              className="input"
              placeholder="First Name"
              onChange={handleFirstNameChange}
            />
          </div>
          <div>
            <input
              type="text"
              className="input"
              placeholder="Last Name"
              onChange={handleLastNameChange}
            />
          </div>
          <div>
            <input
              type="text"
              className="input"
              placeholder="Username"
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <input
              className="input"
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
          </div>
          <div className="flex gap">
            <input
              className="input"
              type="checkbox"
              onChange={handleAdminChange}
            />
            <label>Admin</label>
          </div>
          <button className="btn" onClick={handleRegister}>
            Register
          </button>
          <p>Already have an account?</p>
          <button className="btn" onClick={handleToggleRegister}>
            Login
          </button>
        </div>
      ) : (
        <div className="flex column center gap  login-form">
          <div>
            <h2>Login</h2>
          </div>
          <div>
            <input
              type="text"
              className="input"
              placeholder="Username"
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <input
              type="password"
              className="input"
              placeholder="Password"
              onChange={handlePasswordChange}
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
        </div>
      )}
    </div>
  );
}

export default Login;
