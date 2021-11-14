import {  useState } from "react";
import classes from "./Signup.module.css";
import { Link,  useHistory } from "react-router-dom";
import { checkExistingUserLink } from "../../url/Url";

const Signup = (props) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const history = useHistory();
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
    setError(null);

    fetch(`${ checkExistingUserLink+ emailInput}`)
    .then(response=>response.json())
    .then(data=> {
      //console.log(data);
      if(data.status===406){
        setError(data.message);
        setSuccessMsg(null);
      }
      if(data.status===202){
        history.push({
          pathname:"/otp",
          state:{
            email : emailInput,
            password: passwordInput,
            username:usernameInput,
            action:"Signup email Verification",
            description:"verify your email",
          }
        })
         
      }
    })
    .catch(error=>{
      setError(error.message);
    })

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

            <button className={classes.button} type="submit">
              Signup
            </button>
            {/* <Link  to={{
              pathname:"/otp",
              state:{
                email : emailInput,
                password: passwordInput,
                action:"Signup email Verification",
                description:"verify your email"
              }
            }} > Signup </Link> */}
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
