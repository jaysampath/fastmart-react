import classes from "./ItemAllReviews.module.css";
import { useLocation, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import PaginationForReviews from "../UI/PaginationForReviews";
import Loader from "react-loader-spinner";
import { itemAllReviewsLink } from "../../url/Url";

const ItemAllReviews = () => {

    const location = useLocation();
    const history = useHistory();
    const params = location.state;
    if(!params){
        history.push("/");
    }
    const itemId = params.itemId;
    const itemName = params.itemName;
    const [error,setError] = useState(null);
    const [isLoading,setIsLoading] = useState(false);

    const [fetchedReviews,setFetchedReviews] = useState([]);

    useEffect(()=>{
        const fetchAllReviews = async() => {
            setIsLoading(true);
            const response = await fetch(`${itemAllReviewsLink+ itemId}`);
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
    },[itemId])

    if(error){
        return <p>{error}</p>;
    }

    if(isLoading){
        return (
            <div className={classes.loaderDiv}>
              <h2 className={classes.loaderDivText}>Please wait while we fetch some top products for you...</h2>
              <Loader type="RevolvingDot" color="white" height={100} width={110} />
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
                    pageLimit={5}
                    dataLimit={10}
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