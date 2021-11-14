
import { Link } from "react-router-dom";
import CartIcon from '../Cart/CartIcon';
import { useSelector } from "react-redux";
import classes from './HeaderCartButton.module.css';
import { useEffect } from "react";
import { useState } from "react";


const HeaderCartButton = (props) => {
 
  const numItemsInCart = useSelector((state)=>state.cart.numItems);
  const totalQuantityInCart = useSelector((state)=>state.cart.totalQuantity);
  const [buttonBump,setButtonBump] = useState(false);
  const btnClasses = `${classes.button} ${buttonBump ? classes.bump : ''}`;

  useEffect(()=>{
    if(totalQuantityInCart===0){
      return;
    }
    
    setButtonBump(true);

    const timer = setTimeout(() => {
      setButtonBump(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };

  },[totalQuantityInCart])
  
 
  return (
    <Link to="/cart" className={btnClasses} >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className={classes.yourCart}>Your Cart</span>
      <span className={classes.badge}> <span className={classes.badgeNum}> {numItemsInCart} </span> </span>
    </Link>
  );
};

export default HeaderCartButton;
