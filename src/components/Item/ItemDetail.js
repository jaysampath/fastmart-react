import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, Link, useHistory } from "react-router-dom";
import { addItemToCart, FetchCartData } from "../../redux/CartActions";
import AppAuthContext from "../../context/app-auth-context";
import classes from "./ItemDetail.module.css";
import ItemTopReviews from "./ItemTopReviews";
import Loader from "react-loader-spinner";
import { itemDetailLink } from "../../url/Url";

const ItemDetail = (props) => {
  const [item, setFetchedItem] = useState({});

  const [quantity, setQuantity] = useState(1);
  const authCtx = useContext(AppAuthContext);
  const dispatch = useDispatch();
  const location = useLocation();
  const params = location.state;
  const history = useHistory();
  if (!params) {
    history.push("/");
  }

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const itemId = params.itemId;

  useEffect(() => {
    setIsLoading(true);
    const fetchItemById = async () => {
      const response = await fetch(
        `${itemDetailLink+ itemId}`
      );

      if (!response.ok) {
        throw new Error("Item detail not able to fetch");
      }
      const data = await response.json();
      //console.log(data["itemName"]);
      setFetchedItem(data);
      setIsLoading(false);
      setError(null);
    };

    try {
      fetchItemById().catch((error) => {
        console.log(error);
        setError(error.message);
        setFetchedItem({});
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setFetchedItem({});
      setIsLoading(false);
    }
  }, [itemId]);

  if (!item) {
    return <p>Something went wrong!</p>;
  }

  if (error) {
    return <p>something went wrong, please try again after sometime</p>;
  }

  if (isLoading) {
    return (
      <div className={classes.loaderDiv}>
        <Loader type="Oval" color="black" height={100} width={110} />
      </div>
    );
  }

  const imageResourceUrl = "https://drive.google.com/uc?export=view&id=";

  const quantityChangeHandler = (event) => {
    //console.log(event.target.value);
    setQuantity(event.target.value);
  };

  const addToCartHandler = () => {
    //console.log("quantity: ", quantity);
    dispatch(
      addItemToCart(
        item.itemId,
        quantity,
        authCtx.token["loginCookieForEcommerce"]
      )
    );
    const timer = setTimeout(() => {
      dispatch(FetchCartData(authCtx.token["loginCookieForEcommerce"]));
      clearTimeout(timer);
    }, 2000);
  };

  const orderItemsArray = [
    {
      itemId: item.itemId,
      itemQuantity: quantity,
      itemName: item.itemName,
      itemImageUrl: item.itemImageUrl,
      itemPrice: item.itemPrice,
    },
  ];

  return (
    <div className={classes.itemDetail}>
      <div className={classes.mainDiv}>
        <div className={classes.imageDiv}>
          {item.itemImageUrl && (
            <img
              className={classes.image}
              src={imageResourceUrl + item.itemImageUrl}
              alt="item"
            />
          )}
        </div>
        <div className={classes.detailsDiv}>
          <h1> {item.itemName} </h1>
          <h2> Manufactured by: {item.itemManufacturer}</h2>
          <p>
            {" "}
            {item.itemStock < 50 ? (
              <span className={classes.outOfStock}>
                Hurry only a few left!{" "}
              </span>
            ) : (
              <span className={classes.inStock}>In Stock </span>
            )}{" "}
          </p>
          <h2> &#8377; {item.itemPrice}</h2>
          <h4>
            {item.itemRating} <span className={classes.star}> &#9733; </span>,{" "}
            {item.numRatings} ratings
          </h4>
          <p>
            <label htmlFor="quantity">Quantity: </label>
            <select
              name="quantity"
              id="cars"
              onChange={quantityChangeHandler}
              value={quantity}
            >
              <option value="1"> 1 </option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </p>
          <button
            onClick={addToCartHandler}
            className={classes.addToCartButton}
          >
            Add to Cart
          </button>
          <Link
            className={classes.buyNowLink}
            to={{
              pathname: "/order",
              state: {
                orderItemsArray: orderItemsArray,
              },
            }}
          >
            {" "}
            <button className={classes.buyNowButton}>Buy Now</button>{" "}
          </Link>
        </div>
      </div>
      <div className={classes.clear}></div>
      <hr />
      <ItemTopReviews
        itemId={item.itemId}
        itemRating={item.itemRating}
        itemName={item.itemName}
        itemNumRatings={item.numRatings}
      />
    </div>
  );
};

export default ItemDetail;
