import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import AppAuthContext from "../../context/app-auth-context";
import classes from "./OrderSummary.module.css";
import { useState } from "react";
import Loader from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { saveOrderLink } from "../../url/Url";
import { FetchCartData } from "../../redux/CartActions";

const OrderSummary = (props) => {
  const appAuthCtx = useContext(AppAuthContext);
  const loggedInUser = appAuthCtx.userEmail;
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(null);

  const location = useLocation();
  const params = location.state;
  const dispatch = useDispatch();
  if (!params) {
    return (
      <p style={{ backgroundColor: "white", textAlign: "center" }}>
        Illegal action. Proceed from cart or click buy now option in item-detail
        page to reach here
      </p>
    );
  }

  const orderItems = params.orderItem;
  const orderAddress = params.orderAddress;
  const orderAmount = params.orderAmount;
  const imageResourceUrl = "https://drive.google.com/uc?export=view&id=";
  // console.log("order Items", orderItems);
  // console.log("order address", orderAddress);
  // console.log("order Amount: ",orderAmount);

  let orderItemsData = [];
  orderItems.map((ite) => {
    orderItemsData.push({
      productId: ite.productId,
      productName: ite.productName,
      productQuantity: ite.quantity,
    });
    return 0;
  });

  const orderAddressData = {
    customerName: orderAddress.orderCustomerName,
    customerMobile: orderAddress.orderCustomerMobile,
    address: orderAddress.orderCustomerAddress,
    city: orderAddress.orderCustomerCity,
    state: orderAddress.orderCustomerState,
    pincode: orderAddress.orderCustomerPincode,
  };

  const placeOrderHandler = () => {
    setIsSending(true);
    setIsSuccess(false);
    setIsError(null);
    fetch(saveOrderLink, {
      method: "POST",
      body: JSON.stringify({
        userEmail: loggedInUser,
        orderTime: new Date().toLocaleString(),
        orderAmount: orderAmount,
        orderProducts: orderItemsData,
        orderAddress: orderAddressData,
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*",
        "Authorization" : appAuthCtx.token
      },
    })
      .then((response) => {
        if (!response.ok) {
          setIsSending(false);
          setIsSuccess(null);
          setIsError("Couldn't place order. please try again");
        }
        return response.json();
      })
      .then((data) => {
        //console.log("order data ", data);
        setIsSuccess("Order Placed Succesfully!");
        setIsError(null);
        setIsSending(false);
      })
      .catch((error) => {
        setIsError("Couldn't place order. please try again after sometime");
        setIsSuccess(null);
        setIsSending(false);
      });
  };

  if (isSending) {
    return (
      <div className={classes.loaderDiv}>
        <h2 className={classes.loaderDivText}>Processing your order</h2>
        <Loader type="TailSpin" color="black" height={100} width={110} />
      </div>
    );
  }

  if (isSuccess) {

    dispatch(FetchCartData(loggedInUser, appAuthCtx.token));

    return (
      <div className={classes.successDiv}>
        <h1 className={classes.successMsg}> Order Placed Succesfully!! </h1>
        <p>Thank you for shopping in our site.</p>
        <div className={classes.successActionDiv}>
          <Link to="/" className={classes.continueShopping}>
            Continue Shopping{" "}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.orderSummary}>
      {isError && <p className={classes.error}>{isError}</p>}
      {isSending && <p className={classes.sending}>processing order..</p>}
      <h1 className={classes.title}>Order Summary</h1>
     
      <div className={classes.orderItemsDiv}>
        <h2 style={{marginLeft:"1rem"}}>Order Items</h2>
        {orderItems.map((item) => {
          return (
            <li className={classes.orderItem} key={item.productId}>
              <div className={classes.imageDiv}>
                <div className={classes.imageLink}>
                  <img
                    className={classes.image}
                    src={imageResourceUrl + item.imageUrl}
                    alt="item"
                  />
                </div>
              </div>

              <div className={classes.detailsDiv}>
                <p className={classes.cartItemTitle}>{item.productName}</p>
                <p className={classes.price}> &#8377; {item.price}</p>
              </div>

              <div>
                Quantity:
                <span className={classes.itemQuantitySpan}>
                  {item.quantity}
                </span>
              </div>

              <div className={classes.clear}></div>
            </li>
          );
        })}
      </div>
      <div className={classes.amountDiv}>
        <p>
          Order Amount:{" "}
          <span className={classes.amount}> &#8377; {orderAmount} </span>
        </p>
      </div>
      <div className={classes.orderAddressDiv}>
        <h2>Shipping Address</h2>
        <div className={classes.addressDetailsDiv}>
          <p>
            {" "}
            <span className={classes.addressLabel}> Name: </span>{" "}
            {orderAddress.orderCustomerName}{" "}
          </p>
          <p>
            {" "}
            <span className={classes.addressLabel}>Mobile: </span>{" "}
            {orderAddress.orderCustomerMobile}{" "}
          </p>
          <p>
            {" "}
            <span className={classes.addressLabel}>Address: </span>{" "}
            {orderAddress.orderCustomerAddress}{" "}
          </p>
          <p>
            {" "}
            <span className={classes.addressLabel}> City: </span>{" "}
            {orderAddress.orderCustomerCity}{" "}
          </p>
          <p>
            {" "}
            <span className={classes.addressLabel}>State:</span>{" "}
            {orderAddress.orderCustomerState}{" "}
          </p>
          <p>
            {" "}
            <span className={classes.addressLabel}>Pincode:</span>{" "}
            {orderAddress.orderCustomerPincode}{" "}
          </p>
        </div>
      </div>

      <div className={classes.actionsDiv}>
        <Link className={classes.cancelButton} to="/">
          Cancel
        </Link>
        <button
          className={classes.placeOrderButton}
          onClick={placeOrderHandler}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
