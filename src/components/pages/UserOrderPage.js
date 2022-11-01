import classes from "./UserOrderPage.module.css";
import AppAuthContext from "../../context/app-auth-context";
import { useContext, useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { userOrdersLink } from "../../url/Url";
import { useHistory } from "react-router";
const UserOrderPage = () => {
  const authCtx = useContext(AppAuthContext);
  const history = useHistory();
  if(!authCtx.isLoggedIn){
    history.push("/login");
  }
  const loggedInUser = authCtx.userEmail;

  const [fetchedOrders, setFetchedOrders] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const imageResourceUrl = "https://drive.google.com/uc?export=view&id=";

  useEffect(() => {
    const fetchUserOrder = async () => {
      if(loggedInUser===''){
        return;
      }
      setIsLoading(true);
      const response = await fetch(
        `${ userOrdersLink +loggedInUser}`,{
          headers:{
            "Access-Control-Allow-Origin":"*",
            "Authorization" : authCtx.token
          }
        }
      );

      if (!response.ok) {
        throw new Error("error while fetching user orders");
      }

      const data = await response.json();
      //console.log(data);
      setFetchedOrders(data);
      setIsLoading(false);
    };
    try {
      fetchUserOrder().catch((error) => { 
        console.log(error) 
        setFetchedOrders([]);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error.message);
      setFetchedOrders([]);
      setIsLoading(false);
    }
  }, [loggedInUser, authCtx.token]);

  if(isLoading){
    return (
      <div className={classes.loaderDiv}>
        <Loader type="Oval" color="black" height={100} width={110} />
      </div>
    );
  }

  return (
    <div className={classes.userOrdersPage}>
      <h1 className={classes.pageTitle}>Your Orders</h1>
      <div className={classes.orderDiv}>
        {fetchedOrders.length===0 && <p className={classes.noOrders}>No orders yet!</p> }
        {fetchedOrders.map((order) => {
          return (
            <div className={classes.order} key={order.orderId}>
              <div className={classes.orderTitle}>
                <p>Ordered On: {order.orderTime}</p>
                <p>Order Amount: &#8377; {order.orderAmount}</p>
              </div>
              {order.orderProducts.map((oItem) => {
                return (
                  <div key={oItem.productId}>
                    <div className={classes.orderItemDiv}>
                      <img
                        src={imageResourceUrl + oItem.productImageUrl}
                        className={classes.orderItemImg}
                        alt="order item"
                      />
                      <p>{oItem.productName}</p>
                      <p> &#8377; {oItem.productPrice} </p>
                      <p>Quantity: {oItem.productQuantity} </p>
                    </div>
                    <div>
                        
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserOrderPage;
