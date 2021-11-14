import { useDispatch } from "react-redux";
import classes from "./CartItem.module.css";
import {  addItemQuantityInCart,  reduceItemQuantityInCart,  deleteItemFromCart,} from "../../redux/CartActions";
import { useContext } from "react";
import AppAuthContext from "../../context/app-auth-context";
//import { FetchCartData } from "../../redux/CartActions";
import { Link } from "react-router-dom";
const CartItem = (props) => {
  const cartItem = props.cartItem;

  const authCtx = useContext(AppAuthContext);

  const dispatch = useDispatch();

  const imageResourceUrl = "https://drive.google.com/uc?export=view&id=";

  const addQuantityHandler = () => {
    dispatch(
      addItemQuantityInCart(
        authCtx.token["loginCookieForEcommerce"],
        cartItem.itemId
      )
    );
  };

  const reduceQuantityHandler = () => {
    dispatch(
      reduceItemQuantityInCart(
        authCtx.token["loginCookieForEcommerce"],
        cartItem.itemId
      )
    );
  };

  const deleteItemHandler = () => {
    dispatch(
      deleteItemFromCart(
        authCtx.token["loginCookieForEcommerce"],
        cartItem.itemId
      )
    );
    // const timer = setTimeout(() => {
    //   dispatch(FetchCartData(authCtx.token["loginCookieForEcommerce"]));
    //   clearTimeout(timer);
    // }, 2000);
  };

  return (
    <li className={classes.cartItem}>
      <div className={classes.imageDiv}>
      <Link
        className={classes.imageLink}
        to={{
          pathname: "/item-detail",
          state: {
            itemId: cartItem["itemId"],
          },
        }}
      >
        <img
          className={classes.image}
          src={imageResourceUrl + cartItem["itemImageUrl"]}
          alt="item"
        />
      </Link>
      </div>

      <div className={classes.detailsDiv}>
        <p className={classes.cartItemTitle}>{cartItem["itemName"]}</p>
      <p className={classes.price}> &#8377; {cartItem["itemPrice"]}</p>
        <p className={classes.stock}>{cartItem["itemStock"]<50 ? "Hurry only a few left" : "In Stock"}</p>
      </div>
       
       <div className={classes.actions}>
        <button onClick={reduceQuantityHandler} className={classes.plusMinus}>−</button>
        <span className={classes.itemQuantitySpan}>
          {" "}
          {cartItem["itemQuantity"]}{" "}
        </span>
        <button onClick={addQuantityHandler} className={classes.plusMinus}  >+</button>
        <button onClick={deleteItemHandler}  className={classes.deleteButton}>delete</button>

        </div>
        <div className={classes.clear}></div>
     
    </li>
  );
};

export default CartItem;
