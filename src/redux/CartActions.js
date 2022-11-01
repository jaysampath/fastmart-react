import { cartActions } from "./CartSlice";
import {  fetchUserCartLink,  addItemToCartLink,  addItemQuantityInCartLink,  reduceItemQuantityInCartLink,  deleteItemFromCartLink,} from "../url/Url";

export const FetchCartData = (loggedInUser, token) => {
  //console.log(loggedInUser);

  return async (dispatch) => {
    const fetchCart = async () => {
      const response = await fetch(
        `${ fetchUserCartLink +loggedInUser}`,{
          headers:{
            "Access-Control-Allow-Origin":"*",
            "Authorization" : token
          }
        }
      );

      if (!response.ok) {
        throw new Error("Cart data couldn't load.");
      }

      const data = response.json();
      // console.log(data);
      return data;
    };

    try {
      const cartData = await fetchCart();

      let totalQuan = 0;
      cartData.cartProducts.map((ite) => {
        totalQuan = totalQuan + ite.productQuantity;
        return 0;
      });

      //console.log("total Quantity: ",totalQuan);

      dispatch(
        cartActions.replaceCart({
          items: cartData.cartProducts || [],
          cartAmount: cartData.cartAmount,
          numItems: cartData.cartProducts.length,
          totalQuantity: totalQuan,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const addItemToCart = (itemId, itemQuantity, userEmail, token) => {
  return async (dispatch) => {
    const addItem = async () => {
      const response = await fetch(
        `${addItemToCartLink + userEmail}`,
        {
          method: "POST",
          body: JSON.stringify({
            productId: itemId,
            productQuantity: itemQuantity,
          }),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":"*",
            "Authorization" : token
          },
        }
      );

      if (!response.ok) {
        throw new Error("Adding Item to cart failed!");
      }

      // console.log("Add item to cart response: ",response);

      const data = response.json();
      //console.log("data: ",data);
      return data;
    };

    try {
      const responseData = addItem();

      let totalQuan = 0;
      responseData.cartItems.map((ite) => {
        totalQuan = totalQuan + ite.productQuantity;
        return 0;
      });

      // console.log("total Quantity: ",totalQuan);

      dispatch(
        cartActions.addItemToCart({
          items: responseData.cartProducts,
          cartValue: responseData.cartAmount,
          numItems: responseData.cartProducts.length,
          totalQuantity: totalQuan,
        })
      );
    } catch (error) {}
  };
};

export const addItemQuantityInCart = (loggedInUser, itemId, token) => {
  return async (dispatch) => {
    const addItemQuantity = async () => {
      const response = await fetch(
        `${addItemQuantityInCartLink + loggedInUser}/${itemId}`,
        {
          method: "POST",
          headers:{
            "Access-Control-Allow-Origin":"*",
            "Authorization" : token
          }
        }
      );

      if (!response.ok) {
        throw new Error("Error while adding quantity of an item in cart..");
      }

      const data = response.json();
      return data;
    };

    try {
      const cartData = await addItemQuantity();

      let totalQuan = 0;
      cartData.cartProducts.map((ite) => {
        totalQuan = totalQuan + ite.productQuantity;
        return 0;
      });

      //  console.log("total Quantity: ",totalQuan);

      dispatch(
        cartActions.addItemQuantityInCart({
          items: cartData.cartProducts,
          cartValue: cartData.cartAmount,
          numItems: cartData.cartProducts.length,
          totalQuantity: totalQuan,
        })
      );
    } catch (error) {}
  };
};

export const reduceItemQuantityInCart = (loggedInUser, itemId, token) => {
  return async (dispatch) => {
    const reduceItemQuantity = async () => {
      const response = await fetch(
        `${reduceItemQuantityInCartLink + loggedInUser}/${itemId}`,
        {
          method: "POST",
          headers:{
            "Access-Control-Allow-Origin":"*",
            "Authorization" : token
          }
        }
      );

      if (!response.ok) {
        throw new Error("Error while adding quantity of an item in cart..");
      }

      const data = response.json();
      return data;
    };

    try {
      const cartData = await reduceItemQuantity();

      let totalQuan = 0;
      cartData.cartProducts.map((ite) => {
        totalQuan = totalQuan + ite.productQuantity;
        return 0;
      });

      //  console.log("total Quantity: ",totalQuan);

      dispatch(
        cartActions.addItemQuantityInCart({
          items: cartData.cartProducts,
          cartValue: cartData.cartAmount,
          numItems: cartData.cartProducts.length,
          totalQuantity: totalQuan,
        })
      );
    } catch (error) {}
  };
};

export const deleteItemFromCart = (loggedInUser, itemId, token) => {
  return async (dispatch) => {
    const deleteItem = async () => {
      const response = await fetch(
        `${ deleteItemFromCartLink + loggedInUser}/${itemId}`,
        {
          method: "POST",
          headers:{
            "Access-Control-Allow-Origin":"*",
            "Authorization" : token
          }
        }
      );

      if (!response.ok) {
        throw new Error("Error while deleting item from cart..");
      }

      const data = response.json();
      return data;
    };

    try {
      const cartData = await deleteItem();

      let totalQuan = 0;
      cartData.cartProducts.map((ite) => {
        totalQuan = totalQuan + ite.productQuantity;
        return 0;
      });

      // console.log("total Quantity: ",totalQuan);

      dispatch(
        cartActions.deleteItemFromCart({
          items: cartData.cartProducts,
          cartValue: cartData.cartAmount,
          numItems: cartData.cartProducts.length,
          totalQuantity: totalQuan,
        })
      );
    } catch (error) {}
  };
};
