import { Fragment } from "react";
import HeaderCartButton from "./HeaderCartButton";
import classes from "./MainHeader.module.css";
import AppAuthContext from "../../context/app-auth-context";
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import MaterialIcon from "material-icons-react";

const Header = (props) => {
  const appAuthCtx = useContext(AppAuthContext);
  const history = useHistory();
  const logoutHandler = () => {
    appAuthCtx.logout();
    history.push("/login");
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <h1>
          <Link to="/" className={classes.logo}>
            FastMart
          </Link>
        </h1>
        {appAuthCtx.isLoggedIn ? (
          <p className={classes.userName}>
            {" "}
            Welcome, {`${appAuthCtx.token["loginCookieForEcommerce"]}`}{" "}
          </p>
        ) : null}
        <nav className={classes.nav}>
          <ul>
            <li>
              <HeaderCartButton />
            </li>

            <li>
              {/* <Link to="/user-account" className={classes.dropdown}> */}
              {/* Your Account */}
              {/* <span className="material-icons-outlined">account_circl e</span> */}
              {/* <MaterialIcon icon="account_circle" size={33} color="white"  />
              </Link> */}
              <div className={classes.dropdown}>
                <MaterialIcon icon="account_circle" size={33} color="white" />
                <div className={classes.dropdownContent}>
                  <Link to="/user-orders">Your Orders</Link>
                  <span className={classes.itemSpan}>Your Profile</span>
                  <span className={classes.itemSpan}>Settings</span>
                  <span className={classes.logoutMenuItemSpan}>
                  <button onClick={logoutHandler} className={classes.logoutInMenu}>
                   <MaterialIcon icon="logout"  /> <span className={classes.logoutText}> Logout </span>
                  </button>
                  </span>
                </div>
              </div>
            </li>

            {/* <li>
              <button onClick={logoutHandler} className={classes.logout}>
                Logout
              </button>
            </li> */}
          </ul>
        </nav>
      </header>
    </Fragment>
  );
};

export default Header;
