import classes from "./LatestOrder.module.css";
import { useEffect, useState, useContext } from "react";
import Loader from "react-loader-spinner";
import { getLatestOrder } from "../../url/Url";
import { Link } from "react-router-dom";
import AppAuthContext from "../../context/app-auth-context";

const LatestOrder = (props) => {
  const [fetchLatestOrder, setFetchLatestOrder] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const authCtx = useContext(AppAuthContext);
  const imageResourceUrl = "https://drive.google.com/uc?export=view&id=";

  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);
      const response = await fetch(getLatestOrder + authCtx.userEmail, {
        method : "GET",
        headers : {
          "Access-Control-Allow-Origin":"*",
          "Authorization" : authCtx.token
        }
      });

      if (!response.ok) {
       // throw new Error("something went wrong");
      }

      const data = await response.json();
     // console.log(data);
      setFetchLatestOrder(data);
      setIsError(null);
      setIsLoading(false);
    };

    try {
      fetchOrder().catch((error) => {
       // console.log(error.message);
        setIsError(error.message);
        setIsLoading(false);
      });
    } catch (error) {
      //console.log(error.message);
      setIsError(error.message);
      setIsLoading(false);
    }
  }, [authCtx.userEmail, authCtx.token]);

  if (isError) {
    return null;
  }

  if (!fetchLatestOrder.orderProducts) {
    return null;
  }

  if (isLoading) {
    return (
      <div className={classes.loadingDiv}>
        <Loader type="ThreeDots" />
      </div>
    );
  }
  return (
    <div className={classes.mainDiv}>
      <div className={classes.titleDiv}>
        <h2 className={classes.mainTitle}> What do you think of this item ?</h2>
        {/* <p className={classes.title}>
        {" "}
        We wanted to know your views on your recent order{" "}
      </p> */}
      </div>
      <div className={classes.latestOrderDiv}>
        <div>
          <img
            className={classes.orderImage}
            src={
              imageResourceUrl +
              fetchLatestOrder.orderProducts[0].productImageUrl
            }
            alt="order"
          />
        </div>
        <div className={classes.detailsDiv}>
          <h2 className={classes.orderTitle}> Your Order: </h2>
          <h3>{fetchLatestOrder.orderProducts[0].productName}</h3>
          <h4> {fetchLatestOrder.orderTime} </h4>
        </div>
        <div>
          <Link
            to={{
              pathname: "/item-detail",
              state: {
                productId: fetchLatestOrder.orderProducts[0].productId,
              },
            }}
          >
            <button className={classes.addReviewButton}> Add a review? </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatestOrder;
