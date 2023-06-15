import { ADD_TO_CART, CLEAR_CART, FAVOURITE, REMOVE_TO_CART, SET_CATEGORY, SET_FILTERED_PRODUCTS, SET_PRICE_FILTER } from "./Constant";

const init = {
  cart: [],
  favourite: [],
  category: '',
  products: [],
  filteredProducts: [],
  pricefilter: { min: 0, max: Infinity },
  remove:[],
};

export const ProductReducer = (state = init, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      console.log("add to cart", action);
      return {
        ...state,
        cart: [...state.cart, action.data],
      };
    case FAVOURITE:
      console.log("favourite r", action);
      return {
        ...state,
        favourite: [...state.favourite, action.data],
      };
    case SET_CATEGORY:
      console.log("Category R", action);
      return {
        ...state,
        category: action.category,
      };

      case REMOVE_TO_CART:
        console.log("REMOVE R", action);
        const updatedCart = state.cart.filter((item) => item.id !== action.remove);
        return { ...state, 
          cart: updatedCart ,
          remove:action.remove};

        case CLEAR_CART:
          console.log("cLEAR CART value", action);
          return { ...state, cart:[]};

    case SET_FILTERED_PRODUCTS:
      console.log("Filter product r", action);
      const filtered = state.category
        ? action.products.filter((product) => product.category === state.category)
        : action.products;
      return {
        ...state,
        products: action.products,
        filteredProducts: filtered,
      };
    case SET_PRICE_FILTER:
      console.log("Price Filter product r", action);
      const pricefiltered = state.products.filter(
        (product) =>
          product.price >= action.pricefilter.min && product.price <= action.pricefilter.max
      );
      return {
        ...state,
        filteredProducts: pricefiltered,
        pricefilter: {
          min: action.pricefilter.min,
          max: action.pricefilter.max,
        },
      };
    default:
      return state;
  }
};
