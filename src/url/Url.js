const baseUrl = "http://ec2-65-1-64-123.ap-south-1.compute.amazonaws.com:8080";

export const checkExistingUserLink = baseUrl+ "/user/check/";

export const loginLink = baseUrl+ "/user/login";

export const generateOtpLink = baseUrl+ "/otp/generate/";

export const signupLink  = baseUrl+  "/user/signup";

export const validateOtpLink = baseUrl+ "/otp/validate/";

export const updatePasswordLink = baseUrl+ "/user/update/";

export const ItemsBySubCategoriesLink = baseUrl+ "/item/items/";

export const searchResultsLink = baseUrl+ "/item/search/";

export const addNewReviewLink = baseUrl+ "/item/review";

export const itemAllReviewsLink =  baseUrl+ "/item/reviews/";

export const itemDetailLink =  baseUrl+ "/item/items/";

export const allItemsLink = baseUrl+  "/item/items";

export const itemTopReviewsLink = baseUrl+ "/item/reviews/top/";

export const saveOrderLink =  baseUrl+ "/order/orders";

export const userOrdersLink = baseUrl+ "/order/orders/";

export const fetchUserCartLink = baseUrl+ "/cart/";

export const addItemToCartLink = baseUrl+ "/cart/add/";

export const addItemQuantityInCartLink = baseUrl+ "/cart/change/add/";

export const reduceItemQuantityInCartLink = baseUrl+ "/cart/change/reduce/"

export const deleteItemFromCartLink = baseUrl+ "/cart/delete/";
