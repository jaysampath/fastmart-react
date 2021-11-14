import React, {  useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import classes from "./Login.module.css";
import AppAuthContext from "../../context/app-auth-context";
import { loginLink } from "../../url/Url";
const Login = (props) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccessMsg] = useState(null);
  const history = useHistory();

  const authCtx = useContext(AppAuthContext);

  const emailInputHandler = (event) => {
    setEmailInput(event.target.value);
  };

  const passwordInputHandler = (event) => {
    setPasswordInput(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    //console.log(emailInput + " " + passwordInput);
    if (emailInput === "" || passwordInput === "") {
      setError("All inputs are mandatory");
      return;
    }
    setError(null);
    fetch(loginLink, {
      method: "POST",
      body: JSON.stringify({
        userEmail: emailInput,
        password: passwordInput,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((responce) => { 
        if(!responce.ok){
          throw new Error("failed to login. please try again after sometime")
        }
        return responce.json()
       })
      .then((data) => {
       // console.log(data);
        const status = data["status"];
        const message = data["message"];

        if (status === 404 || status === 406) {
          setError(message);
          setSuccessMsg(null);
        }
        if (status === 202) {
          setError(null);
          setSuccessMsg(message);
          authCtx.login(emailInput);
          //window.location.href = "http://localhost:3000";
          history.push("/");
        }
      })
      .catch((error) => {
        setError(error.message);
        console.log(error.message);
      });
  };

  return (
      <div className={classes.loginPage}>
      <div className={classes.formDiv}>
      <h1 className={classes.title}> FastMart </h1>
      <p className={classes.description}> Welcome back user! </p>
      {error ? <p className={classes.error}>{error}</p> : ""}
      {success && <p className={classes.success}>{success}</p>}
        <form onSubmit={submitHandler}>
          <div className={classes.input}>
            <label htmlFor="email">Email</label>
            <input
              value={emailInput}
              id="username"
              type="email"
              onChange={emailInputHandler}
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              value={passwordInput}
              type="password"
              onChange={passwordInputHandler}
            />

            <button className={classes.button} type="submit">
              Login
            </button>
            <div className={classes.forgotDiv}>
              <Link to="/forgot" className={classes.forgotLink}>
                Forgot Password?
              </Link>
            </div>
            <div className={classes.signupDiv}>
              <Link to="/register" className={classes.signupLink}>
                New User? Signup here
              </Link>
            </div>
          </div>
        </form>
      </div>
      </div>
  );
};

export default Login;
