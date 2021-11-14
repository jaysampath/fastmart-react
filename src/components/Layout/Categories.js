import classes from "./Categories.module.css";
import { Link } from "react-router-dom";
import Search from "../Category/Search";

const Categories = (props) => {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <Link
            className={classes.link}
            to={{
              pathname: "/",
            }}
          >
            All
          </Link>
        </li>
        <li>
          <Link
            className={classes.link}
            to={{
              pathname: "/category",
              state: {
                categoryName: "Electronics",
              },
            }}
          >
            Electronics
          </Link>
        </li>
        <li>
          <Link
            className={classes.link}
            to={{
              pathname: "/category",
              state: {
                categoryName: "Mobiles",
              },
            }}
          >
            Mobiles
          </Link>
        </li>
        <li>
          <Link
            className={classes.link}
            to={{
              pathname: "/category",
              state: {
                categoryName: "Home Appliances",
              },
            }}
          >
            Home Appliances
          </Link>
        </li>
        <li>
          <Link
            className={classes.link}
            to={{
              pathname: "/category",
              state: {
                categoryName: "Beauty",
              },
            }}
          >
            Beauty
          </Link>
        </li>
        <li>
          <Link
            className={classes.link}
            to={{
              pathname: "/category",
              state: {
                categoryName: "Books",
              },
            }}
          >
            Books
          </Link>
        </li>
        <li>
          <Link
            className={classes.link}
            to={{
              pathname: "/category",
              state: {
                categoryName: "Grocery",
              },
            }}
          >
            Grocery
          </Link>
        </li>
      </ul>
      <Search />
    </nav>
  );
};

export default Categories;
