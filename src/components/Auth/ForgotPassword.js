import classes from "./ForgotPassword.module.css";
import { useState } from "react";
import { useHistory } from "react-router";
import { checkExistingUserLink } from "../../url/Url";

const ForgotPassword = () => {
  const [emailInput, setEmailInput] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();
  const emailInputHandler = (event) => {
    setEmailInput(event.target.value);
  };

  const cancelButtonHandler = () => {
    //window.location.href = "http://localhost:3000/login";
    history.push("/login");
  };

  const submitHandler = (event) => {
    event.preventDefault();

    fetch(`${ checkExistingUserLink+ emailInput}`)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        if (data.status === 202) {
          setError("you are not a registered user. please signup");
        }
        if (data.status === 406) {
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
