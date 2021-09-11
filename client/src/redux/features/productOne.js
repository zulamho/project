const initialState = {
    loading: true,
    productOne: [],
    error: null,
    image: [],
  };
  
  export default function products(state = initialState, action) {
    switch (action.type) {
      case "product/fetch-products/pending":
        return {
          ...state,
          loading: true,
        };
      case "product/fetch-products/fulfilled":
        return {
          ...state,
          loading: false,
          product: action.payload,
          error: action.error,
        };
      case "product/fetch-products/rejected":
        return {
          ...state,
          loading: false,
          product: action.error,
        };
      case "product/post/pending":
        return {
          ...state,
          loading: true,
        };
      case "product/post/fulfilled":
        return {
          ...state,
          loading: false,
          product: action.payload,
        };
  
      case "product/image/pending":
        return {
          ...state,
          loading: true,
        };
      case "product/image/fulfilled":
        return {
          ...state,
          loading: false,
          image: action.payload.image,
        };
      case "product/delete":
        return {
          ...state,
          product: state.product.filter(
            (products) => products.id !== action.payload
          ),
        };
        case "product/edit":
        return {
          ...state,
          product: state.product.filter(
            (products) => products.id !== action.payload
          ),
        };
        case "products/filter/fulfilled":
        return {
          ...state,
          filter: action.payload,
        };
  
      default:
        return state;
    }
  }
  
  export const fetchProductOne = (id) => {
    return async (dispatch, getState) => {
      const state = getState();
      dispatch({ type: "product/fetch-products/pending" });
      try {
        const response = await fetch(`http://localhost:4000/product/${id}`, {
          headers: {
            Authorization: `Bearer ${state.application.token}`,
          },
        });
  
        const json = await response.json();
  
        if (json.error) {
          dispatch({
            type: "product/fetch-products/rejected",
            error: "При запросе на сервер произошла ошибка",
          });
        } else {
          dispatch({ type: "product/fetch-products/fulfilled", payload: json });
        }
      } catch (e) {
        dispatch({
          type: "product/fetch-products/rejected",
          error: e.toString(),
        });
      }
    };
  };
  
  