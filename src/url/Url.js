const baseUrl = "https://fastmart-backend.herokuapp.com";
//const baseUrl = "http://localhost:8080";

export const validateTokenLink = baseUrl + "/user/validate/token";

export const checkExistingUserLink = baseUrl+ "/user/check/";

export const loginLink = baseUrl+ "/user/login";

export const generateOtpLink = baseUrl+ "/otp/generate/";

export const signupLink  = baseUrl+  "/user/signup";

export const validateOtpLink = baseUrl+ "/otp/validate/";

export const updatePasswordLink = baseUrl+ "/user/update/";

export const ItemsBySubCategoriesLink = baseUrl+ "/product/";

export const searchResultsLink = baseUrl+ "/product/search/";

export const addNewReviewLink = baseUrl+ "/product/review";

export const itemAllReviewsLink =  baseUrl+ "/product/reviews/";

export const itemDetailLink =  baseUrl+ "/product/";

export const allItemsLink = baseUrl+  "/product/list";

export const itemTopReviewsLink = baseUrl+ "/product/reviews/top/";

export const saveOrderLink =  baseUrl+ "/order/orders";

export const userOrdersLink = baseUrl+ "/order/orders/";

export const fetchUserCartLink = baseUrl+ "/cart/";

export const addItemToCartLink = baseUrl+ "/cart/add/";

export const addItemQuantityInCartLink = baseUrl+ "/cart/change/add/";

export const reduceItemQuantityInCartLink = baseUrl+ "/cart/change/reduce/"

export const deleteItemFromCartLink = baseUrl+ "/cart/delete/";

export const getTopRatedMobilesLink = baseUrl + "/product/top-rated/mobiles";

export const getLatestOrder = baseUrl+"/order/latest/";
