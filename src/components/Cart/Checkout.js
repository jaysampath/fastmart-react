import classes from "./Checkout.module.css";

const Checkout = (props) => {


  return (
    <form className={classes.form} >
      <div >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" />
      </div>
      <div >
        <label htmlFor="street">Street</label>
        <input type="text" id="street"  />
      </div>
      <div >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal"  />
      </div>
      <div >
        <label htmlFor="city">City</label>
        <input type="text" id="city" />
      </div>
      <div className={classes.actions}>
        <button type="button" >
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
