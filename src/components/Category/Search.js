import { useState } from "react";
import classes from "./Search.module.css";
import {  useHistory} from "react-router-dom";
import searchImg from "../../resources/search1.png";
const Search = () => {
  const [searchText, setTextSearch] = useState("");
  const history = useHistory();

  const searchTextHandler = (event) => {
    setTextSearch(event.target.value);
  };

  const searchButtonHandler = (event) => {
    event.preventDefault();

    if(searchText===''){
      return;
    }

    history.push({
      pathname:"/search-results",
      state:{
        text: searchText,
      }
    })
  };

  return (
    <div className={classes.searchDiv}>
      <form onSubmit={searchButtonHandler}>
        <input
          className={classes.searchFeild}
          type="text"
          //required
          onChange={searchTextHandler}
          //minLength="3"
          placeholder="search for anything.. "
        />
        <button type="submit" className={classes.submitButton}>
          <img
            className={classes.searchIcon}
            src={searchImg}
            alt="search"
          />
        </button>
      </form>
    </div>
  );
};

export default Search;
