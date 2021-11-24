import classes from "./TopRatedSmartphones.module.css";
import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { getTopRatedMobilesLink } from "../../url/Url";
import { Link } from "react-router-dom";

const TopRatedSmartphones = (props) => {
  const [fetchTopMobiles, setFetchTopMobiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const imageResourceUrl = "https://drive.google.com/uc?export=view&id=";
  useEffect(() => {
    const fetchMobiles = async () => {
      setIsLoading(true);
      const response = await fetch(getTopRatedMobilesLink);

      if (!response.ok) {
        throw new Error("something went wrong");
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
  }, []);

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
                key={item.itemId}
                className={classes.logoLink}
                to={{
                  pathname: "/item-detail",
                  state: {
                    itemId:item.itemId
                  },
                }}
              >
                  <div className={classes.linkDes}>
                <img
                  src={imageResourceUrl + item.itemImageUrl}
                  alt="logo"
                  className={classes.logo}
                />
                <p>{item.itemName}</p>
                </div>
              </Link>
            })
          }
          </div>
    </div>
  );
};

export default TopRatedSmartphones;
