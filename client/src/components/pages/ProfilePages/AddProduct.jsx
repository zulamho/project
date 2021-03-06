import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Container, TextField } from "@material-ui/core";
import { addImage, addProduct } from "../../../redux/features/products";
import Header from "../HomePage/Header";
import { fetchCategories, removeCategory } from "../../../redux/features/categories";
import { NavLink } from "react-router-dom";
import {  withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { fetchProductss } from "../../../redux/features/cat";



const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

const useStyles = makeStyles((theme) =>
createStyles({
  card: {
    backgroundColor: "gainsboro",
    padding: "0",
  },
  margin: {
      margin: theme.spacing(1)
    }
})
);





function AddProduct() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const categories = useSelector((state) => state.products.produc);

 

  const handleAddName = (e) => {
    setName(e.target.value);
  };
  const handleAddCategory = (e) =>{
    setCategory(e.target.value);
  }

  const handleAddPrice = (e) => {
    setPrice(e.target.value);
  };

  const handleAddImage = async (e) => {
    await dispatch(addImage(e));
  };

  const handleAddProduct = () => {
    dispatch(addProduct(name, price,category));
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };



  return (
    <Container>
     
      <Header />
      <h3>???????????????? ??????????</h3>
      
      <TextField
        id="outlined-multiline-static"
        label="???????????????? ????????????"
        multiline
        rows={1}
        value={name}
        onChange={handleAddName}
        variant="outlined"
      />
      <TextField
        id="outlined-multiline-static"
        label="???????????????? ??????????????????"
        multiline
        rows={1}
        value={category}
        onChange={handleAddCategory}
        variant="outlined"
      />
      <TextField
        id="outlined-multiline-static"
        label="?????????????? ??????????????????"
        multiline
        rows={1}
        value={price}
        onChange={handleAddPrice}
        variant="outlined"
      />

      <Button onClick={handleAddProduct} variant="contained" color="primary">
        ????????????????
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
