import {
  ADD_TO_CART,
  CLEAR_CART,
  FAVOURITE,
  REMOVE_TO_CART,
  SET_CATEGORY,
  SET_FILTERED_PRODUCTS,
  SET_PRICE_FILTER,
} from "./Constant";

export const addtocart = (data) => {
  console.log("add to cart ", data);
  return {
    type: ADD_TO_CART,
    data,
  };
};

export const favourite = (data) => {
  console.log("like action", data);
  return {
    type: FAVOURITE,
    data,
  };
};

export const setCategory = (category) => {
  console.log("category action", category);
  return {
    type: SET_CATEGORY,
    category,
  };
};

export const removetocart = (remove) => {
  console.log("Remove action", remove);
  return {
    type: REMOVE_TO_CART,
    remove,
  };
};

export const clearcart = () => {
  console.log("Clear action");
  return {
    type: CLEAR_CART,
  };
};

export const setFilteredProducts = (products) => {
  console.log("products action", products);
  return {
    type: SET_FILTERED_PRODUCTS,
    products,
  };
};

export const setPriceFilter = (minPrice, maxPrice) => {
  console.log("Price filter", minPrice, maxPrice);
  return {
    type: SET_PRICE_FILTER,
    pricefilter: {
      min: minPrice,
      max: maxPrice,
    },
  };
};
