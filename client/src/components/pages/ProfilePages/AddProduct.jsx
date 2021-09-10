import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Button, Container, TextField } from "@material-ui/core";
import { addImage, addProduct } from "../../../redux/features/products";
import Header from "../HomePage/Header";

function AddProduct() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleAddName = (e) => {
    setName(e.target.value);
  };

  const handleAddPrice = (e) => {
    setPrice(e.target.value);
  };

  const handleAddImage = async (e) => {
    await dispatch(addImage(e));
  };

  const handleAddProduct = () => {
    dispatch(addProduct(name, price));
  };

  return (
    <Container>
      <Header />
      <TextField
        id="outlined-multiline-static"
        label="Введите имя"
        multiline
        rows={1}
        value={name}
        onChange={handleAddName}
        variant="outlined"
      />
      <TextField
        id="outlined-multiline-static"
        label="Введите стоимость"
        multiline
        rows={1}
        value={price}
        onChange={handleAddPrice}
        variant="outlined"
      />

      <Button onClick={handleAddProduct} variant="contained" color="primary">
        Добавить
      </Button>
      <div>
        <Button onChange={handleAddImage} variant="contained">
          <input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleAddImage}
          />
        </Button>
      </div>
    </Container>
  );
}
export default AddProduct;
