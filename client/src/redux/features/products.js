const initialState = {
  loading: true,
  product: [],
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

    default:
      return state;
  }
}

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "product/fetch-products/pending" });
    try {
      const response = await fetch("http://localhost:4000/product", {
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

export const addProduct = (name, price, image, category) => {
  return async (dispatch, getState) => {
    dispatch({ type: "product/post/pending" });

    const state = getState();

    const response = await fetch("http://localhost:4000/product", {
      method: "POST",
      body: JSON.stringify({
        name,
        price,
        image: state.products.image,
        category,
      }),
      headers: {
        Authorization: `Bearer ${state.application.token}`,
        "Content-type": "application/json",
      },
    });
    const json = await response.json();

    dispatch({
      type: "product/post/fulfilled",
      payload: json,
    });
    window.location.reload();
  };
};

export const addImage = (e) => {
  return async (dispatch) => {
    dispatch({ type: "product/image/pending" });

    const { files } = e.target;
    const data = new FormData();
    data.append("image", files[0]);

    const response = await fetch("http://localhost:4000/product/upload", {
      method: "POST",
      body: data,
    });

    const json = await response.json();

    dispatch({
      type: "product/image/fulfilled",
      payload: json,
    });
  };
};
export const removeProducts = (id) => {
  return (dispatch, getState) => {
    const state = getState();
    fetch(`http://localhost:4000/product/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${state.application.token}`,
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        dispatch({ type: "product/delete", payload: id });
      });
      window.location.reload();
  };
};

export const editProducts = (id,name, price,) => {
  return (dispatch, getState) => {
    const state = getState();
    fetch(`http://localhost:4000/product/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        name,
        price,
        image: state.products.image,
        category,
      }),
      
      headers: {
        Authorization: `Bearer ${state.application.token}`,
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        dispatch({ type: "product/edit", payload: id });
      });
      window.location.reload();
  };
};
