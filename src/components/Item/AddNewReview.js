import classes from "./AddNewReview.module.css";
import { useContext, useState } from "react";
import AppAuthContext from "../../context/app-auth-context";
import { addNewReviewLink } from "../../url/Url";
const AddNewReview = (props) => {
  const itemId = props.itemId;
  const authCtx = useContext(AppAuthContext);
  const loggedInUser = authCtx.token["loginCookieForEcommerce"];
  const [isSent, SetIsSent] = useState(false);
  const [isError, setIsError] = useState(null);
  const [reviewInput, setReviewInout] = useState("");
  const [ratingInput, setRatingInput] = useState(0);

  const onAddReviewHandler = (event) => {
    event.preventDefault();
    //console.log(ratingInput, reviewInput);
    if (ratingInput === "" || reviewInput === 0) {
      setIsError("all inputs are mandatory");
      return;
    }
    if (ratingInput < 0 || ratingInput > 5) {
      setIsError("rating should be in range of 0-5");
      return;
    }
    
    if (reviewInput.length < 5) {
      setIsError("review is too short");
      return;
    }
    setIsError(null);
    fetch(addNewReviewLink, {
      method: "POST",
      body: JSON.stringify({
        userEmail: loggedInUser,
        review: reviewInput,
        postedTime: "",
        rating: ratingInput,
        itemId: itemId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "something went wrong. please try again after sometime"
          );
        }
        return response.json();
      })
      .then((data) => {
       // console.log(data);
        SetIsSent(true);
        setIsError(null);
        const timer = setTimeout(()=>{
            props.onHide();
            clearTimeout(timer);
        },1000)
        
      })
      .catch((error) => {
        console.log(error.message);
        setIsError(error.message);
        SetIsSent(false);
      });
  };

  const hideReviewHandler = () => {
    props.onHide();
  };

  const reviewInputHandler = (event) => {
    setReviewInout(event.target.value);
  };

  const ratingInputHandler = (event) => {
    setRatingInput(event.target.value);
  };

  return (
    <div className={classes.form}>
      {isError && <p className={classes.error}>{isError}</p>}
      {isSent && <p className={classes.success}>review added successfully!</p>}
      <form onSubmit={onAddReviewHandler}>
        <div className={classes.formInput}>
          <label htmlFor="review">Your Review</label>
          <textarea
            className={classes.textArea}
            htmlFor="review"
            onChange={reviewInputHandler}
          />
        </div>
        <div className={classes.formInput}>
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            step="0.1"
            onChange={ratingInputHandler}
            placeholder="enter a value betweeen 0-5"
          />
        </div>
        <div className={classes.actions}>
          <button type="submit" className={classes.addButton}>Add</button>
        </div>
      </form>
      <button onClick={hideReviewHandler} className={classes.cancelButton}>Cancel</button>
    </div>
  );
};

export default AddNewReview;
