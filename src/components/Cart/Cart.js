import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartValue = useSelector((state) => state.cart.cartValue);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  let orderItemsToCheckOut = [];
  cartItems.map((ite) => {
    orderItemsToCheckOut.push({
      itemId: ite.itemId,
      itemImageUrl: ite.itemImageUrl,
      itemPrice: ite.itemPrice,
      itemQuantity: ite.itemQuantity,
      itemName: ite.itemName,
    });
    return 0;
  });

  // console.log("orderItemsToCheckOut: ",orderItemsToCheckOut)

  return (
    <div className={classes.cart}>
      <div className={classes.cartTitle}>
        <h1>Your cart</h1>
        <h2 className={classes.cartAmountDiv}>
          Cart Value :{" "}
          <span className={classes.cartAmount}> &#8377; {cartValue} </span>
        </h2>
      </div>

      <div className={classes.totalQuantityDiv}>
        <p>Total Quantity : {totalQuantity}</p>
      </div>

      {cartItems.map((tempItem) => (
        <CartItem key={tempItem["itemId"]} cartItem={tempItem} />
      ))}

      {totalQuantity < 1 && (
        <p className={classes.emptyCart}>
          Nothing in your cart. Explore our products and add to cart
        </p>
      )}
      <div className={classes.cartActionsDiv}>
        {totalQuantity > 0 && (
          <Link
            className={classes.proceedToCheckout}
            to={{
              pathname: "/order",
              state: {
                orderItemsArray: orderItemsToCheckOut,
              },
            }}
          >
            Procced to check out
          </Link>
        )}
      </div>
    </div>
  );
};

export default Cart;
