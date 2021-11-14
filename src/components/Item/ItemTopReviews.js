import classes from "./ItemTopReviews.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddNewReview from "./AddNewReview";
import Loader from "react-loader-spinner";
import { itemTopReviewsLink } from "../../url/Url";
const ItemTopReviews = (props) => {
  const itemId = props.itemId;
  const itemName = props.itemName;
  const itemRating = props.itemRating;
  const itemNumRatings = props.itemNumRatings;

  const [isLoading, setIsLoading] = useState(false);
  const [fetchItemTopReviews, setFetchItemTopReviews] = useState([]);
  const [showAddReview, setShowAddReview] = useState(false);
  useEffect(() => {
    const fetchItemTopReviews = async () => {
      if (!itemId) {
        return;
      }
      setIsLoading(true);
      const response = await fetch(
        `${itemTopReviewsLink+ itemId}`
      );
      if (!response.ok) {
        throw new Error("Something went wrong. Top Reviews are not loaded");
      }
      const data = await response.json();
      setFetchItemTopReviews(data);
      setIsLoading(false);
      //console.log(data);
    };

    try {
      fetchItemTopReviews().catch((error) => {
        console.log(error.message);
        setIsLoading(false);
        setFetchItemTopReviews([]);
      });
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
      setFetchItemTopReviews([]);
    }
  }, [itemId]);

  const addReviewHandler = () => {
    setShowAddReview(true);
  };

  const hideReviewHandler = () => {
    setShowAddReview(false);
  };

  if (isLoading) {
    return (
      <div className={classes.loaderDiv}>
        <h2 className={classes.loaderDivText}>
          loading item's top reviews
        </h2>
        <Loader type="TailSpin" color="black" height={50} width={50} />
      </div>
    );
  }

  if (itemNumRatings === 0) {
    return (
      <div className={classes.noReviews}>
        <p>no reviews yet.</p>
        {showAddReview && (
          <AddNewReview itemId={itemId} onHide={hideReviewHandler} />
        )}
        {!showAddReview && (
          <button onClick={addReviewHandler}>Add a Review</button>
        )}
      </div>
    );
  }

  return (
    <div className={classes.topReviewsDiv}>
      <div className={classes.pageTitleDiv}>
        <h2>Top Reviews</h2>
        <h3>
          Item rating: {itemRating}{" "}
          <span className={classes.star}> &#9733; </span> , ( {itemNumRatings} ){" "}
        </h3>
      </div>

      {fetchItemTopReviews.map((review) => {
        return (
          <div key={review.id} className={classes.review}>
            <div className={classes.titleDiv}>
              <h3>{review.userEmail}</h3>
              <h4>
                {review.rating} <span className={classes.star}> &#9733; </span>
              </h4>
            </div>
            <div className={classes.reviewTextDiv}>
              <p>{review.review}</p>
            </div>
          </div>
        );
      })}
      <div className={classes.actions}>
        {itemNumRatings > 4 && (
          <Link
            to={{
              pathname: "/all-reviews",
              state: {
                itemId: itemId,
                itemName: itemName,
              },
            }}
            className={classes.allReviewsLink}
          >
            See All Reviews
          </Link>
        )}
        {showAddReview && (
          <AddNewReview itemId={itemId} onHide={hideReviewHandler} />
        )}
        {!showAddReview && (
          <button onClick={addReviewHandler} className={classes.addReviewButton}>Add a Review</button>
        )}
      </div>
    </div>
  );
};

export default ItemTopReviews;
