import classes from "./OtpForm.module.css";
import { useLocation, useHistory } from "react-router-dom";
import { useState } from "react";
import { useEffect, useContext } from "react";
import AppAuthContext from "../../context/app-auth-context";
import Loader from "react-loader-spinner";
import Timer from "./Timer";
import { generateOtpLink, validateOtpLink, signupLink } from "../../url/Url";

const OtpForm = (props) => {
  const [enteredOtp, setEnteredOtp] = useState("");
  const [isGenratingOtp, setIsGeneratingOtp] = useState(false);
  const [isValidatingOtp, setIsValidatingOtp] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const history = useHistory();
  const authCtx = useContext(AppAuthContext);
  const params = location.state;
  if (!params) {
   // window.location.href = "http://localhost:3000/login";
   history.push("/login");
  }
  const email = params.email;
  const username = params.username;
  const password = params.password;
  const action = params.action;
  const description = params.description;

  useEffect(() => {
    const generateOtp = async () => {
      setIsGeneratingOtp(true);
      const response = await fetch(
        `${ generateOtpLink+ email}`
      );
      if (!response.ok) {
        throw new Error(
          "not able to send otp. please try again after sometime"
        );
      }
      //const data = await response.json();
      //console.log("otp generated? ", data);
      setIsGeneratingOtp(false);
    };

    try {
      generateOtp().catch((error) => {
        setError(error.message);
        setIsGeneratingOtp(false);
      });
    } catch (error) {
      setError(error.message);
      setIsGeneratingOtp(false);
    }
  }, [email]);

  const otpInputHandler = (event) => {
    setEnteredOtp(event.target.value);
  };

  const cancelButtonHandler = () => {
    //window.location.href = "http://localhost:3000/login";
    history.push("/login");
  };

  const refreshPageHandler = () => {
    window.location.reload(false);
  };

  const registerNewUser = () => {
    fetch(signupLink, {
      method: "POST",
      body: JSON.stringify({
        userName: username,
        userEmail: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log("signup response", data);
        if (data["status"] !== 202) {
          setError(data["message"]);
        } else {
          setError(null);
          setSuccess("Signed up successfully");

          const timer = setTimeout(() => {
            setSuccess(null);

            clearTimeout(timer);
          }, 500);

          const locationTimer = setTimeout(() => {
            authCtx.login(email);
            //window.location.href = "http://localhost:3000";
            history.push("/");

            clearTimeout(locationTimer);
          }, 500);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  const otpSubmitHandler = (event) => {
    event.preventDefault();
    //console.log("enetered otp:" + enteredOtp);
    setIsValidatingOtp(true);
    fetch(`${validateOtpLink+ email}/${enteredOtp}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setIsValidatingOtp(false);
        if (data.status === 406) {
          setError(data.message);
        }
        if (data.status === 202) {
          setError(null);
          let msg = "Signup email Verification";
          const stateMsg = action===msg ? "setting up your account.." : "redirecting to enter new password";
          setSuccess(`otp is valid, ${stateMsg}`);
          if (action !== msg) {
            const locationTimer = setTimeout(() => {
              history.push({
                pathname: "/update-pw",
                state: {
                  email: email,
                },
              });
              clearTimeout(locationTimer);
            }, 1000);
          }
          if (action === msg) {
            registerNewUser();
          }
        }
      })
      .catch((error) => {
        console.log(error.message);
        setIsValidatingOtp(false);
      });
  };

  if (isGenratingOtp) {
    return (
      <div className={classes.otpPage}>
        <div className={classes.generateDiv}>
          <p style={{color:"red",fontWeight:"bold"}}>sending otp to your mail..</p>
          <Loader type="Oval" color="white" height={40} width={40} />
        </div>
      </div>
    );
  }

  return (
    <div className={classes.otpPage}>
      <div className={classes.otpFormDiv}>
        <h2>{action}</h2>
        <p>
          Hi {email} , please enter the otp to {description}
        </p>
        {error && <p className={classes.error}>{error}</p>}
        {success && <p className={classes.success}> {success} </p>}
        {isValidatingOtp && <p>validating your otp..</p>}
        <form onSubmit={otpSubmitHandler}>
          <div className={classes.inputDiv}>
            <input
              type="text"
              onChange={otpInputHandler}
              placeholder="enter otp.."
            />
          </div>
          <div className={classes.timer}>
            Expires in: <Timer />
          </div>
          <div className={classes.resendDiv}>
            Haven't received yet?{" "}
            <button className={classes.resend} onClick={refreshPageHandler}>
              Resend Otp
            </button>
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

export default OtpForm;
