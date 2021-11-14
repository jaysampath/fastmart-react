import classes from "./UserAccountPage.module.css";
import AppAuthContext from "../../context/app-auth-context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import React from "react";

const UserAccount = () => {
   const appCtx = useContext(AppAuthContext);
 
   return (
           <div className={classes.account}>
               <h1 className={classes.userEmail}>Hi, {appCtx.token["loginCookieForEcommerce"]} </h1>
               <hr />
               <div className={classes.linksDiv} >
                   <ul className={classes.links}>
                       <li className={classes.linkToPage}>
                           Your Profile
                       </li>
                       <li className={classes.linkToPage}>
                          <Link to="/user-orders" className={classes.ordersLink}> Your Orders </Link>
                       </li>
                       <li className={classes.linkToPage}>
                           Settings
                       </li>
                   </ul>
               </div>
           </div>
   );
};

export default UserAccount;