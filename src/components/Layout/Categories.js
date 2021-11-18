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
          <span className={classes.borderMenu}></span>
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
          <span className={classes.borderMenu}></span>
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
          <span className={classes.borderMenu}></span>
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
          <span className={classes.borderMenu}></span>
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
          <span className={classes.borderMenu}></span>
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
          <span className={classes.borderMenu}></span>
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
          <span className={classes.borderMenu}></span>
        </li>
      </ul>
      <Search />
    </nav>
  );
};

export default Categories;
