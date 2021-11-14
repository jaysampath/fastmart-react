import classes from "./OrderAddressForm.module.css";
import StateOptions from "./StateOption";
import { useState } from "react";
import { Link } from "react-router-dom";

const OrderAddressForm = (props) => {
  const [nameInput, setNameInput] = useState("");
  const [mobileInput, setMobileInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [stateInput, setStateInput] = useState("Andhra Pradesh");
  const [pincodeInput, setPincodeInput] = useState("");

  const [error, setError] = useState(null);
  const [isValidated, setIsValidated] = useState(false);

  const cancelHandler = () => {
    props.onCancel();
  };

  const proceedHandler = (event) => {
    event.preventDefault();

    if (
      nameInput === "" ||
      mobileInput === "" ||
      addressInput === "" ||
      cityInput === "" ||
      stateInput === "" ||
      pincodeInput === ""
    ) {
      setError("* marked fields are mandatory");
      return;
    }

    if (mobileInput.length !== 10) {
      setError("** please enter a valid number");
      return;
    }

    if (addressInput.length < 5) {
      setError("** address should be atleast five characters long");
      return;
    }

    if (pincodeInput.length !== 6) {
      setError("** please enter a valid pincode");
      return;
    }

    setError(null);
    setIsValidated(true);
  };

  return (
    <div className={classes.form}>
      <h3>Fill in the shipping address</h3>
      <p className={classes.required}> * Required </p>
      {error && <p className={classes.error}>{error}</p>}
      <div>
        <form onSubmit={proceedHandler}>
          <div className={classes.inputDiv}>
            <label className={classes.label} htmlFor="name">
              Name <span className={classes.required}>*</span>
            </label>
            <input
              className={classes.input}
              id="name"
              type="text"
              value={nameInput}
              onChange={(event) => {
                setNameInput(event.target.value);
              }}
            />
          </div>

          <div className={classes.inputDiv}>
            <label className={classes.label} htmlFor="mobile">
              Mobile <span className={classes.required}>*</span>
            </label>
            <input
              className={classes.input}
              id="mobile"
              type="text"
              value={mobileInput}
              onChange={(event) => {
                setMobileInput(event.target.value);
              }}
            />
          </div>

          <div className={classes.inputDiv}>
            <label className={classes.label} htmlFor="address">
              address <span className={classes.required}>*</span>
            </label>
            <input
              className={classes.input}
              id="address"
              type="text"
              value={addressInput}
              onChange={(event) => {
                setAddressInput(event.target.value);
              }}
            />
          </div>
          <div className={classes.inputDiv}>
            <label className={classes.label} htmlFor="city">
              City <span className={classes.required}>*</span>
            </label>
            <input
              className={classes.input}
              id="city"
              type="text"
              value={cityInput}
              onChange={(event) => {
                setCityInput(event.target.value);
              }}
            />
          </div>
          <div className={classes.inputDiv}>
            <label className={classes.label} htmlFor="state">
              State <span className={classes.required}>*</span>
            </label>
            <select
              className={classes.input}
              id="state"
              value={stateInput}
              onChange={(event) => {
                setStateInput(event.target.value);
              }}
            >
              {StateOptions.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className={classes.inputDiv}>
            <label className={classes.label} htmlFor="pincode">
              Pincode <span className={classes.required}>*</span>
            </label>
            <input
              className={classes.input}
              id="pincode"
              type="number"
              value={pincodeInput}
              onChange={(event) => {
                setPincodeInput(event.target.value);
              }}
            />
          </div>
          <div className={classes.actionsDiv}>
            <button className={classes.button} onClick={cancelHandler}>
              {" "}
              cancel{" "}
            </button>
            {!isValidated && (
              <button className={classes.proceedButton} type="submit">
                Proceed
              </button>
            )}
            {isValidated && (
              <Link
                className={classes.previewLink}
                to={{
                  pathname: "/order-summary",
                  state: {
                    orderItem: props.orderItems,
                    orderAmount: props.orderAmount,
                    orderAddress: {
                      orderCustomerName: nameInput,
                      orderCustomerMobile: mobileInput,
                      orderCustomerAddress: addressInput,
                      orderCustomerCity: cityInput,
                      orderCustomerState: stateInput,
                      orderCustomerPincode: pincodeInput,
                    },
                  },
                }}
              >
                {" "}
                Preview and place Order{" "}
              </Link>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderAddressForm;
