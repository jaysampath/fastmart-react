import classes from "./ItemAllReviews.module.css";
import { useLocation, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import PaginationForReviews from "../UI/PaginationForReviews";
import Loader from "react-loader-spinner";
import { itemAllReviewsLink } from "../../url/Url";
import { useContext } from "react";
import AppAuthContext from "../../context/app-auth-context";

const ItemAllReviews = () => {

    const location = useLocation();
    const history = useHistory();
    const params = location.state;
    if(!params){
        history.push("/");
    }
    const itemId = params.itemId;
    const itemName = params.itemName;
    const authCtx = useContext(AppAuthContext);
    const [error,setError] = useState(null);
    const [isLoading,setIsLoading] = useState(false);

    const [fetchedReviews,setFetchedReviews] = useState([]);

    useEffect(()=>{
        const fetchAllReviews = async() => {
            setIsLoading(true);
            const response = await fetch(`${itemAllReviewsLink+ itemId}`,{
                headers:{
                    "Access-Control-Allow-Origin":"*",
                    "Authorization" : authCtx.token
                }
            });
            if(!response.ok){
                throw new Error("not able to fetch item reviews");
            }
            const data = await response.json();
            //console.log(data);
            setError(null);
            setFetchedReviews(data);
            setIsLoading(false);
        }

        try {
            fetchAllReviews().catch(error => {
                console.log(error);
                setError(error.message);
                setFetchedReviews([]);
                setIsLoading(false);
            })
        } catch (error) {
            console.log(error.message);
                setError(error.message);
                setFetchedReviews([]);
                setIsLoading(false);
        }
    },[itemId, authCtx.token])

    if(error){
        return <p>{error}</p>;
    }

    if(isLoading){
        return (
            <div className={classes.loaderDiv}>
              <h2 className={classes.loaderDivText}>loading reviews...</h2>
              <Loader type="RevolvingDot" color="black" height={100} width={110} />
            </div>
          );
    }


    return (
        <div className={classes.reviewsDiv}>
            <h1 className={classes.pageTitle}>{itemName}'s all reviews</h1>
            {
               fetchedReviews.length > 0 ? (
                <>
                  <PaginationForReviews
                    data={fetchedReviews}
                    pageLimit={Math.round(fetchedReviews.length/5)}
                    dataLimit={5}
                  />
                </>
              ) : (
               <h1>No Revies to display</h1>
              )
            }
        </div>
    )
};

export default ItemAllReviews;