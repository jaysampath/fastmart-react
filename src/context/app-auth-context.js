import React, { useState } from "react";
import { useCookies } from 'react-cookie';
import Cookies from "js-cookie";
import { useEffect } from "react";
import { validateTokenLink } from "../url/Url";

const AppAuthContext = React.createContext({
  token: null,
  userId : "",
  userEmail : "",
  prettyName : "",
  username: "",
  isLoggedIn: false,
  login:(token)=>{},
  logout: () => {},
});
 
export const AppAuthContextProvider = (props) => {
  
  const [cookie, setCookie] = useCookies(["fastmartAccessToken"]);
  
  //console.log(cookie);

  const storedCookie = Cookies.get("fastmartAccessToken");
 
 // console.log("fastmartAccessToken in app: ",storedCookie);

  const [token, setToken] = useState(storedCookie);
  const [userEmail, setUserEmail] = useState("");
  const [username, setUsername] = useState("");
  const [prettyName, setPrettyName] = useState("");
 
  const userIsAuth = !!token;

  useEffect(() => {
     fetch(validateTokenLink+`?accessToken=${cookie["fastmartAccessToken"]}`)
     .then((response) => {
       if(!response.ok) {
         console.log("unable to validate token present in cookies. Redirecting to login page")
         this.logout();
       }
       return response.json();
     })
     .then(data => {
      //console.log("validate token response - ",data);
      if(data !== undefined) {
      setToken(data.accessToken);
      setToken('Bearer '+data.accessToken);
      setUserEmail(data.userEmail);
      setUsername(data.username);
      setPrettyName(data.prettyName);
      }
     }).catch(error => {
      //console.log(error);
      setToken(null);
     })
  }, [cookie]);

  const loginHandler = (loginResponse) => {
    //console.log(token);
    setToken('Bearer '+loginResponse.accessToken);
    setUserEmail(loginResponse.userEmail);
    setUsername(loginResponse.username);
    setPrettyName(loginResponse.prettyName);
    setCookie("fastmartAccessToken", loginResponse.accessToken, { path: "/" });
  };

  const logoutHandler = () => {
    setToken(null);
    //console.log("logout");
    setCookie("fastmartAccessToken","",{path:"/"});
  };

  const contextValue = {
    token: token,
    userId : "",
    userEmail : userEmail,
    username : username,
    prettyName : prettyName,
    isLoggedIn: userIsAuth,
    login:loginHandler,
    logout: logoutHandler,
  };

  return (
    <AppAuthContext.Provider value={contextValue}>
      {props.children}
    </AppAuthContext.Provider>
  );
};

export default AppAuthContext;