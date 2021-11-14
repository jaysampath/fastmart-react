import { useEffect, useState } from "react";
import classes from "./Items.module.css"; 
import Pagination from "../UI/Pagination";
import Loader from "react-loader-spinner";
import { allItemsLink } from "../../url/Url";

const Items = (props) => {
  const [fetchedItems, setFetchedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    const fetchItems = async () => {
      const responce = await fetch(allItemsLink);
      if (!responce.ok) {
        throw new Error(
          "Something went wrong while fetching Items. Please try again after some time."
        );
      }
      const data = await responce.json();
      setFetchedItems(data);
      setIsLoading(false);
      setError(null);
    };

    try {
      fetchItems().catch((error) => {
        console.log(error);
        setError(error.message);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      console.log(error.message);
    }
  }, []);

  if (isLoading) {
    // return <p className={classes.isLoading}>fetching items...</p>;
    return (
      <div className={classes.loaderDiv}>
        <h2 className={classes.loaderDivText}>Please wait while we fetch some top products for you...</h2>
        <Loader type="Oval" color="black" height={100} width={110} />
      </div>
    );
  }

  if (error) {
    return <p className={classes.error}>{error}</p>;
  }

  return (
    <div className={classes.items}>
      {/* {fetchedItems.map((item) => {
        return <ItemCard key={item.itemId} item={item} />;
      })} */}

      {fetchedItems.length > 0 ? (
        <>
          <Pagination data={fetchedItems} pageLimit={5} dataLimit={12} />
        </>
      ) : (
        <h1>No Items to display</h1>
      )}
    </div>
  );
};

export default Items;
