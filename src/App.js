import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Cart from "./components/Cart/Cart";
import AppAuthContext from "./context/app-auth-context";
import { useContext, useEffect } from "react";
import Items from "./components/Item/Items";
import ItemDetail from "./components/Item/ItemDetail";
import Category from "./components/Category/Category";
import UserAccount from "./components/pages/UserAccountPage";
import { useDispatch } from "react-redux";
import { FetchCartData } from "./redux/CartActions";
import ItemsBySubCategories from "./components/Category/ItemsBySubCategories";
import Order from "./components/Order/Order";
import OrderSummary from "./components/Order/OrderSummary";
import UserOrderPage from "./components/pages/UserOrderPage";
import SearchResults from "./components/Category/SearchResults";
import ItemAllReviews from "./components/Item/ItemAllReviews";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import OtpForm from "./components/Auth/OtpForm";
import ForgotPassword from "./components/Auth/ForgotPassword";
import UpdatePassword from "./components/Auth/UpdatePassword";

function App() {
  const authCtx = useContext(AppAuthContext);

  const dispatch = useDispatch();
  //const cart = useSelector(state=>state.cart);

  const loggedInUserEmail = authCtx.token["loginCookieForEcommerce"];

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      dispatch(FetchCartData(loggedInUserEmail));
    }
  }, [authCtx.isLoggedIn, dispatch, loggedInUserEmail]);

  return (
    <Switch>
      <Route path="/login" exact>
        <Login />
      </Route>

      <Route path="/register" exact>
        <Signup />
      </Route>

      <Route path="/otp" exact>
        <OtpForm />
      </Route>

      <Route path="/forgot" exact>
        <ForgotPassword />
      </Route>

      <Route path="/update-pw" exact>
        <UpdatePassword />
      </Route>

      <Route path="/cart" exact>
        <Layout>
          <Cart />
        </Layout>
      </Route>

      <Route path="/item-detail" exact>
        <Layout>
          <ItemDetail />
        </Layout>
      </Route>

      <Route path="/category" exact>
        <Layout>
          <Category />
        </Layout>
      </Route>

      <Route path="/user-account" exact>
        <Layout>
          <UserAccount />
        </Layout>
      </Route>

      <Route path="/" exact>
        {authCtx.isLoggedIn ? (
          <Layout>
            <Items />
          </Layout>
        ) : (
          <Redirect to="/login" exact />
        )}
      </Route>

      <Route path="/subcategory/items" exact>
        <Layout>
          <ItemsBySubCategories />
        </Layout>
      </Route>

      <Route path="/order" exact>
        <Layout>
          <Order />
        </Layout>
      </Route>

      <Route path="/order-summary" exact>
        <Layout>
          <OrderSummary />
        </Layout>
      </Route>

      <Route path="/user-orders" exact>
        <Layout>
          <UserOrderPage />
        </Layout>
      </Route>

      <Route path="/search-results" exact>
        <Layout>
          <SearchResults />
        </Layout>
      </Route>

      <Route path="/all-reviews" exact>
        <Layout>
          <ItemAllReviews />
        </Layout>
      </Route>
    </Switch>
  );
}

export default App;
