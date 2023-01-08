import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../actions/loggedUser";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();

  const history = useNavigate();

  const logUser = useSelector((state) => state.logUser);
  const { userInfo } = logUser;

  useEffect(() => {
    const loginFlag = JSON.parse(localStorage.getItem("userInfo"));
    console.log(loginFlag);
    if (loginFlag != null) {
      history("/");
    }
  }, [history, userInfo]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    dispatch(login(formDataObj));
  };
  return (
    <div className="container" id="container">
      <div className="form-container sign-in-container">
        <form onSubmit={handleSubmit} type="submit">
          <h1>Login</h1>

          <input name="email" type="email" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />

          <Link style={{ color: "blue" }} to="/signup">
            Click here to Register
          </Link>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
