import React, {  useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import classes from "./Login.module.css";
import AppAuthContext from "../../context/app-auth-context";
import { loginLink } from "../../url/Url";
const Login = (props) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccessMsg] = useState(null);
  const history = useHistory();

  const authCtx = useContext(AppAuthContext);
  if(authCtx.isLoggedIn){
    history.push("/");
  }

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
    setIsLoading(true);
    fetch(loginLink, {
      method: "POST",
      body: JSON.stringify({
        userEmail: emailInput,
        password: passwordInput,
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*"
      },
    })
      .then(
        response => 
        response.json().then(data => ({
          responseData: data,
            status: response.status
        })
      ))
      .then((data) => {
        //console.log(data);
        setIsLoading(false);
        const status = data.status;
        const loginResponse =  data.responseData;
        //console.log(status, loginResponse);

        if (status === 404) {
          setError("Not a registered user, please signup");
          setSuccessMsg(null);
        }
        if (status === 406) {
          setError("username and password combination is incorrect");
          setSuccessMsg(null);
        }
        if (status === 200) {
          setError(null);
          setSuccessMsg("Login Successful");
          const timer = setTimeout(()=>{
            setSuccessMsg(null);

            authCtx.login(loginResponse);
            history.push("/");

            clearTimeout(timer);
         },1000)
        }
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
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

            <button className={classes.button} type="submit" disabled={isLoading}>
              {isLoading ? "Please wait while this login request awake the backend instance..." : "Login"}
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
