import { useLocation } from "react-router-dom";
import OrderAddressForm from "./OrderAddressForm";
import { useState } from "react";
import classes from "./Order.module.css";

const Order = (props) => {
  const [showForm, setShowForm] = useState(false);

  const location = useLocation();
  const params = location.state;

  if (!params) {
    return (
      <p style={{ backgroundColor: "white", textAlign: "center" }}>
       Illegal action.  Proceed from cart or click buy now option in item-detail page to reach here
      </p>
    );
  }

  const orderItemsArray = params.orderItemsArray;

  //console.log(orderItemsArray);

  const imageResourceUrl = "https://drive.google.com/uc?export=view&id=";

  const formFillHandler = () => {
    setShowForm(true);
  };

  const hideFormHandler = () => {
    setShowForm(false);
  };

  let orderAmount = 0;
  orderItemsArray.map((ite) => {
    orderAmount = orderAmount + ite.itemPrice * ite.itemQuantity;
    return 0;
  });

  //console.log("orderAmount in Order.js file",orderAmount);

  return (
    <div className={classes.orderPage}>
      <h1>Order page</h1>
      <hr />
      <p>
        Order Amount:{" "}
        <span className={classes.amount}> &#8377; {orderAmount} </span>
      </p>
      <hr />
      <div>
        <h2>Order Items</h2>
        {orderItemsArray.map((item) => {
          return (
            <li className={classes.orderItem} key={item.itemId}>
              <div className={classes.imageDiv}>
                <div className={classes.imageLink}>
                  <img
                    className={classes.image}
                    src={imageResourceUrl + item.itemImageUrl}
                    alt="item"
                  />
                </div>
              </div>

              <div className={classes.detailsDiv}>
                <p className={classes.cartItemTitle}>{item.itemName}</p>
                <p className={classes.price}> &#8377; {item.itemPrice}</p>
              </div>

              <div>
                Quantity:
                <span className={classes.itemQuantitySpan}>
                  {item.itemQuantity}
                </span>
              </div>

              <div className={classes.clear}></div>
            </li>
          );
        })}
        {/* <div>
          <h3>{itemName}</h3>
          <p> &#8377; {itemPrice} </p>
          <p>Quantity: {itemQuantity} </p>
        </div>
        <div>
          <h3>Order Amount: &#8377; {itemQuantity * itemPrice}</h3>
        </div> */}
      </div>
      <div>
        {!showForm && (
          <button onClick={formFillHandler} className={classes.formButton}>
            Proceed to fill Shipping Address
          </button>
        )}
      </div>
      {showForm && (
        <OrderAddressForm
          onCancel={hideFormHandler}
          orderItems={orderItemsArray}
          orderAmount={orderAmount}
        />
      )}
    </div>
  );
};

export default Order;
