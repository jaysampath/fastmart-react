import classes from "./ForgotPassword.module.css";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { checkExistingUserLink } from "../../url/Url";
import AppAuthContext from "../../context/app-auth-context";

const ForgotPassword = () => {
  const [emailInput, setEmailInput] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();
  const authCtx = useContext(AppAuthContext)
  if(authCtx.isLoggedIn){
    history.push("/");
  }
  const emailInputHandler = (event) => {
    setEmailInput(event.target.value);
  };

  const cancelButtonHandler = () => {
    history.push("/login");
  };

  const submitHandler = (event) => {
    event.preventDefault();

    fetch(`${ checkExistingUserLink+ emailInput}`,{
      headers:{
        "Access-Control-Allow-Origin":"*"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        if (data.status === 202) {
          setError("you are not a registered user. please signup");
        }
        if (data.status === 404) {
          history.push({
            pathname: "/otp",
            state: {
              email: emailInput,
              password: "",
              username: "",
              action: "Forgot Password email Verification",
              description: "reset your password",
            },
          });
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className={classes.forgotPasswordPage}>
      <div className={classes.forgotPasswordDiv}>
       
        <form onSubmit={submitHandler}>
          <h2> Forgot Password </h2>
          {error && <p className={classes.error}>{error}</p>}
          <p> Please enter your email to verify your account. </p>
          <div className={classes.inputDiv}>
            <input type="email" required onChange={emailInputHandler} placeholder="your email" />
          </div>
          <div className={classes.actions}>
            <button type="submit" className={classes.submit}>
              Submit
            </button>
            <button onClick={cancelButtonHandler} className={classes.cancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
