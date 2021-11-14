import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import classes from "./UpdatePassword.module.css";
import { updatePasswordLink } from "../../url/Url";
const UpdatePassword = () => {
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const params = location.state;
  if (!params) {
    //window.location.href = "http://localhost:3000/login";
    history.push("/login");
  }
  const email = params.email;

  const passwordChangeHandler = (event) => {
    setPasswordInput(event.target.value);
  };

  const confirmPasswordChangeHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (passwordInput === "" || confirmPasswordInput === "") {
      setError("all inputs are mandatory");
      return;
    }
    if (passwordInput !== confirmPasswordInput) {
      setError("password and confirm password should be equal");
      return;
    }
    setError(null);
    setIsUpdating(true);
    fetch(`${updatePasswordLink+ email}/${passwordInput}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "error while updating password, please try again after sometime"
          );
        }
        return response.json();
      })
      .then((data) => {
        //console.log(data);
        setIsUpdating(false);
        setSuccess("password updated.");
        const timer = setTimeout(() => {
          setSuccess(null);
          clearTimeout(timer);
        }, 500);

        const locationTimer = setTimeout(() => {
          //window.location.href = "http://localhost:3000/login";
          history.push("/login");
          clearTimeout(locationTimer);
        }, 500);
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
        setIsUpdating(false);
      });
  };

  const cancelButtonHandler = () => {
    //window.location.href = "http://localhost:3000/login";
    history.push("/login");
  };

  return (
    <div className={classes.updatePasswordPage}>
      <div className={classes.formDiv}>
        <h2>Reset your password </h2>
        <p> Hi {email} reset your password here. </p>
        {
            isUpdating && <p className={classes.isUpdating}>updating your password</p>
        }
        {
            error && <p className={classes.error}>{error}</p>
        }
        {
            success && <p className={classes.success}>{success}</p>
        }
        <form onSubmit={formSubmitHandler}>
          <div className={classes.inputDiv}>
            <label>Enter new Password</label>
            <input type="password" onChange={passwordChangeHandler} />
          </div>
          <div className={classes.inputDiv}>
            <label>Confirm new Password</label>
            <input type="password" onChange={confirmPasswordChangeHandler} />
          </div>
          <div className={classes.actions}>
            <button type="submit" className={classes.submit}>
              {" "}
              Submit{" "}
            </button>
            <button
              type="button"
              onClick={cancelButtonHandler}
              className={classes.cancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
