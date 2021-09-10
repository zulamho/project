const initialState = {
    loading: true,
    category: [],
    error: null,
};

  export default function categories(state = initialState, action) {
    switch (action.type) {
      case "category/post/pending":
        return {
          ...state,
          loading: true,
        };
        case "categories/fulfilled":
      return {
        ...state,
        loading: false,
        category: action.payload,
        error: action.error,
      };
      case "categories/rejected":
      return {
        ...state,
        loading: false,
        category: action.error,
      };

      case "categories/post/pending":
      return {
        ...state,
        loading: true,
      };

      case "category/post/fulfilled":
      return {
        ...state,
        loading: false,
        category: action.payload,
      };

      case "categories/delete":
      return {
        ...state,
        category: state.product.filter(
          (categories) => categories.id !== action.payload
        ),
      };
      case "categories/edit":
      return {
        ...state,
        category: state.product.filter(
            (categories) => categories.id == action.payload
        ),
      };

      default:
      return state;

    }
}


export const fetchCategories = () => {
    return async (dispatch, getState) => {
      const state = getState();
      dispatch({ type: "categories/fulfilled" });
      try {
        const response = await fetch("http://localhost:4000/categories", {
          headers: {
            Authorization: `Bearer ${state.application.token}`,
          },
        });
        console.log(response)
  
        const json = await response.json();
        console.log(json)
  
        if (json.error) {
          dispatch({
            type: "ss",
            error: "При запросе на сервер произошла ошибка",
          });
        } else {
          dispatch({ type: "category/post/fulfilled", payload: json });
        }
      } catch (e) {
        dispatch({
          type: "categories/rejected",
          error: e.toString(),
        });
      }
    };
  };


  export const addCategory = (name) => {
    return async (dispatch, getState) => {
      dispatch({ type: "category/post/pending" });
  
      const state = getState();
  
      const response = await fetch("http://localhost:4000/category", {
        method: "POST",
        body: JSON.stringify({
          name,
          
        }),
        headers: {
          Authorization: `Bearer ${state.application.token}`,
          "Content-type": "application/json",
        },
      });
      const json = await response.json();
  
      dispatch({
        type: "category/post/fulfilled",
        payload: json,
      });
      window.location.reload();
    };
  };
  
  export const removeCategory = (id) => {
    return (dispatch, getState) => {
      const state = getState();
      fetch(`http://localhost:4000/category/${id}`, {
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