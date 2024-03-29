import { useState, useContext } from "react";
import classes from "./Signup.module.css";
import { Link, useHistory } from "react-router-dom";
import { checkExistingUserLink } from "../../url/Url";
import AppAuthContext from "../../context/app-auth-context";
const Signup = (props) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
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

  const usernameInputHandler = (event) => {
    setUsernameInput(event.target.value);
  };

  const confrimPasswordInputHandler = (event) => {
    setConfirmPasswordInput(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    //console.log(emailInput, usernameInput, passwordInput, confirmPasswordInput);
    if (
      emailInput === "" ||
      passwordInput === "" ||
      confirmPasswordInput === "" ||
      usernameInput === ""
    ) {
      setError("All Inputs are mandatory");
      return;
    }
    setError(null);
    if (passwordInput !== confirmPasswordInput) {
      setError("password and confirm password aren't equal");
      return;
    }

    if (passwordInput.length<8) {
      setError(
        "Password should be atleast 8 chars long"
      );
      return;
    }
    setError(null);
    setIsLoading(true);
    fetch(`${checkExistingUserLink + emailInput}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setIsLoading(false);
        if (data.status === 404) {
          setError("Email already registered. Please login with the same.");
          setSuccessMsg(null);
        }
        if (data.status === 202) {
          history.push({
            pathname: "/otp",
            state: {
              email: emailInput,
              password: passwordInput,
              username: usernameInput,
              action: "Signup email Verification",
              description: "verify your email",
            },
          });
        }
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  return (
    <div className={classes.signupPage}>
      <div className={classes.formDiv}>
        <h1 className={classes.title}> FastMart </h1>
        <p className={classes.description}> Welcome! </p>
        {error ? <p className={classes.error}>{error}</p> : ""}
        {successMsg && <p className={classes.success}>{successMsg}</p>}
        <form onSubmit={submitHandler}>
          <div className={classes.input}>
            <label htmlFor="email">Email</label>
            <input
              value={emailInput}
              id="email"
              type="email"
              onChange={emailInputHandler}
            />

            <label htmlFor="username">User Name</label>
            <input
              value={usernameInput}
              id="username"
              type="text"
              onChange={usernameInputHandler}
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              value={passwordInput}
              type="password"
              onChange={passwordInputHandler}
            />

            <label htmlFor="confirm-password">Confirm password</label>
            <input
              id="confirm-password"
              value={confirmPasswordInput}
              type="password"
              onChange={confrimPasswordInputHandler}
            />

            <button className={classes.button} type="submit" disabled={isLoading}>
              {isLoading ? "Please wait while this signup request awake the backend instance..." : "Signup"}
            </button>
            <Link to="/login" className={classes.loginLink}>
              Already a user? Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
