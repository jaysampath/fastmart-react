import classes from "./TopRatedSmartphones.module.css";
import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { getTopRatedMobilesLink } from "../../url/Url";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AppAuthContext from "../../context/app-auth-context";

const TopRatedSmartphones = (props) => {
  const [fetchTopMobiles, setFetchTopMobiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const imageResourceUrl = "https://drive.google.com/uc?export=view&id=";
  const authCtx = useContext(AppAuthContext);

  useEffect(() => {
    const fetchMobiles = async () => {
      setIsLoading(true);
      const response = await fetch(getTopRatedMobilesLink, {
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
      setFetchTopMobiles(data);
      setIsError(null);
      setIsLoading(false);
    };

    try {
      fetchMobiles().catch((error) => {
        console.log(error.message);
        setIsError(error.message);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error.message);
      setIsError(error.message);
      setIsLoading(false);
    }
  }, [authCtx.token]);

  if(isLoading){
      return <div className={classes.loadingDiv}>
          <Loader type="ThreeDots" />
      </div>
  }

  if(isError){
    return null;
  }

  return (
    <div className={`${classes.container}`}>
      <div className={`${classes.logoDiv} ${classes.card} ${classes.shadow}`}>
          {
            fetchTopMobiles.map(item=> {
                return <Link
                key={item.productId}
                className={classes.logoLink}
                to={{
                  pathname: "/item-detail",
                  state: {
                    productId:item.productId
                  },
                }}
              >
                  <div className={classes.linkDes}>
                <img
                  src={imageResourceUrl + item.imageUrl}
                  alt="logo"
                  className={classes.logo}
                />
                <p>{item.productName}</p>
                </div>
              </Link>
            })
          }
          </div>
    </div>
  );
};

export default TopRatedSmartphones;
