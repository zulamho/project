import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../redux/features/products";
import AddCategory from "./AddCategory";
import AddProduct from "./AddProduct";



function ProfilePages() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
 

 

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return ( <>
  <AddProduct/>
  <AddCategory/>
  </>
  )
}

export default ProfilePages;
