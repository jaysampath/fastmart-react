import { Fragment, useContext } from "react";
import MainHeader from "./MainHeader";
import classes from "./Layout.module.css";
import Categories from "./Categories";
import Footer from "./Footer";
import AppAuthContext from "../../context/app-auth-context";
import { useHistory } from "react-router-dom";

const Layout = (props) => {
  const authCtx = useContext(AppAuthContext);
  const history = useHistory();
  if(!authCtx.isLoggedIn){
    history.push("/login");
  }

  return (
    <Fragment>
      <MainHeader />
      <Categories />
      <main className={classes.main}>{props.children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;