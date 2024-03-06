import React, { useState, useEffect } from "react";
// import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./listpotrait.css";
// import { Button, Container } from '@material-ui/core'
// import { Avatar } from '@material-ui/core'
// import { LockOutlinedIcon } from '@material-ui/icons'
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Img from "./logo.png";

const SignUp = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user2");
    if (auth) {
      navigate("/");
    }
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [color, setColor] = useState("primary");

  const collectData = async () => {
    setColor("tertiary");
    if (!name || !email || !password) {
      setError(true);
      return false;
    }

    let data = await fetch("https://server-2-s0sk.onrender.com/signupcheck", {
      method: "post",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    data = await data.json();
    console.log(data);

    if (data.email) {
      alert("email already registered, try another one");
    } else if (!data.email) {
      let result = await fetch("https://server-2-s0sk.onrender.com/signup", {
        method: "post",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.warn(result);

      localStorage.setItem("user2", JSON.stringify(result));
      // localStorage.setItem('token', JSON.stringify(result.auth));
      navigate("/");
    } else {
      let result = await fetch("https://server-2-s0sk.onrender.com/signup", {
        method: "post",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.warn(result);

      localStorage.setItem("user2", JSON.stringify(result));
      // localStorage.setItem('token', JSON.stringify(result.auth));
      navigate("/");
    }

    // console.warn(name, email, password);
  };

  return (
    <div id="wrapper">
      <div class="main-content">
        <div class="header">
          <img src={Img} />
        </div>
        <div class="l-part">
          <input
            type="text"
            placeholder="name"
            class="input-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && !name && (
            <span className="invalid-input">Enter vaild field</span>
          )}
          <input
            type="text"
            placeholder="Email"
            class="input-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && !email && (
            <span className="invalid-input">Enter vaild field</span>
          )}
          <div class="overlap-text">
            <input
              type="password"
              placeholder="Password"
              class="input-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && !password && (
              <span className="invalid-input">Enter vaild field</span>
            )}
            <a href="#">Forgot?</a>
          </div>
          {error && (
            <span className="invalid-input">invalid username or password</span>
          )}
          <input
            type="button"
            value="Register"
            class="btn6"
            onClick={collectData}
          />
        </div>
      </div>
      <div class="sub-content">
        <div class="s-part">
          Already have an account?<Link to="/Login">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
