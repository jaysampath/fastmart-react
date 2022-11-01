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
        authCtx.userEmail,
        cartItem.productId,
        authCtx.token
      )
    );
  };

  const reduceQuantityHandler = () => {
    dispatch(
      reduceItemQuantityInCart(
        authCtx.userEmail,
        cartItem.productId,
        authCtx.token
      )
    );
  };

  const deleteItemHandler = () => {
    dispatch(
      deleteItemFromCart(
        authCtx.userEmail,
        cartItem.productId,
        authCtx.token
      )
    );
    // const timer = setTimeout(() => {
    //   dispatch(FetchCartData(authCtx.userEmail));
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
            productId: cartItem["productId"],
          },
        }}
      >
        <img
          className={classes.image}
          src={imageResourceUrl + cartItem["productImageUrl"]}
          alt="item"
        />
      </Link>
      </div>

      <div className={classes.detailsDiv}>
        <p className={classes.cartItemTitle}>{cartItem["productName"]}</p>
      <p className={classes.price}> &#8377; {cartItem["productPrice"]}</p>
        <p className={classes.stock}>{cartItem["productStock"]<50 ? "Hurry only a few left" : "In Stock"}</p>
      </div>
       
       <div className={classes.actions}>
        <button onClick={reduceQuantityHandler} className={classes.plusMinus}>−</button>
        <span className={classes.itemQuantitySpan}>
          {" "}
          {cartItem["productQuantity"]}{" "}
        </span>
        <button onClick={addQuantityHandler} className={classes.plusMinus}  >+</button>
        <button onClick={deleteItemHandler}  className={classes.deleteButton}>delete</button>

        </div>
        <div className={classes.clear}></div>
     
    </li>
  );
};

export default CartItem;
