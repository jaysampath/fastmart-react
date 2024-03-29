import { useState } from "react";
import { useEffect, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import ItemCard from "../Item/ItemCard";
import Loader from "react-loader-spinner";
import { ItemsBySubCategoriesLink } from "../../url/Url";
import AppAuthContext from "../../context/app-auth-context";

const ItemsBySubCategories = (props) => {
  const location = useLocation();
  const params = location.state;
  const history = useHistory();
  if (!params) {
    history.goBack();
  }
  
  const categoryName = params.categoryName;
  const subCategoryName = params.subCategoryName;
  const [isLoading,setIsLoading] = useState(false);
  const [fetchedItems, setFetchedItems] = useState([]);
  const authCtx = useContext(AppAuthContext);

  useEffect(() => {
    setIsLoading(true);
    const fetchSubCategoryItems = async () => {
      const response = await fetch(
        `${ItemsBySubCategoriesLink+ categoryName}/${subCategoryName}`,
        {
          headers:{
            "Access-Control-Allow-Origin":"*",
            "Authorization" : authCtx.token
          }
        }
      );
      if (!response.ok) {
        throw new Error(
          "Error while fetching items by sub category, please try again after somethime"
        );
      }
      const data = await response.json();
      //console.log(data);
      setFetchedItems(data);
      setIsLoading(false);
    };

    try {
      fetchSubCategoryItems().catch((error) =>{
        setIsLoading(false);
        //console.log(error);
       });
    } catch (error) {
      setIsLoading(false);
      //console.log(error.message);
    }
  }, [categoryName, subCategoryName, authCtx.token]);

  if(isLoading){
    return <div style={{textAlign:"center"}}>
    <h3 style={{color:"white"}}>Please wait while we fetch some top products this category</h3>
    <Loader type="ThreeDots" color="black" height={100} width={110} />
  </div>
  }

  if(!isLoading && fetchedItems.length===0){
      return <p style={{color:"grey",textAlign:"center",fontStyle:"oblique"}}>There are no items yet... please visit after some time</p>
  }

  return (
    <div>
      {fetchedItems.map((item) => {
        return <ItemCard key={item.productId} item={item} />;
      })}
    </div>
  );
};

export default ItemsBySubCategories;
