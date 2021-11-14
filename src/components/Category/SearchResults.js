import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import classes from "./SearchResults.module.css";
import ItemCard from "../Item/ItemCard";
import Loader from "react-loader-spinner";
import { searchResultsLink } from "../../url/Url";
const SearchResults = (props) => {
  const location = useLocation();
  const history = useHistory();
  const params = location.state;
  if (!params) {
    history.push("/");
  }
  const searchText = params.text;
  //   if(searchText.length<=3){
  //      history.goBack();
  //   }
  const [isError, setIsError] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [fetchedResults, setFetchedResults] = useState([]);
  useEffect(() => {
    const fetchSearchItems = async () => {
      if (searchText.length === 0) {
        setIsError("search should not be empty");
        setIsFetched(true);
        return;
      }
      const response = await fetch(
        `${searchResultsLink + searchText}`
      );
      if (!response.ok) {
        throw new Error("Not able to search, pls try again after sometime");
      }

      const data = await response.json();
      setIsError(null);
      setIsFetched(true);
      setFetchedResults(data);
      // console.log(data);
    };
    try {
      fetchSearchItems().catch((error) => {
        console.log(error.message);
        setIsFetched(false);
        setIsError(error.message);
        setFetchedResults([]);
      });
    } catch (error) {
      console.log(error.message);
      setIsFetched(false);
      setIsError(error.message);
      setFetchedResults([]);
    }
  }, [searchText]);

  if(!isFetched){
    return (
      <div className={classes.loaderDiv}>
        <h2 className={classes.loaderDivText}>searching..</h2>
        <Loader type = "Bars" color="black" height={100} width={110} />
      </div>
    );
  }

  if (isError) {
    return <p style={{color:"red",textAlign:"center",fontStyle:"oblique"}}>{isError}</p>;
  }

  if(isFetched & fetchedResults.length===0){
    return <p style={{color:"gray",textAlign:"center",fontStyle:"italic"}}>No results found. Try searching with different text</p>;
  }

  return (
    <div className={classes.searchResultsDiv}>
      {isFetched && (
        <div>
          <h1 style={{color:"#89a1ac",textAlign:"center"}}>showing results for "{searchText}"</h1>
          {fetchedResults.map((item) => {
            return <ItemCard key={item.itemId} item={item} />;
          })}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
