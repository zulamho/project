import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, TextField } from "@material-ui/core";
import { useState } from "react";
import {
  fetchProducts,
  removeProducts,
} from "../../../redux/features/products";

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      backgroundColor: "gainsboro",
      padding: "0",
    },
  })
);

function MainPages2() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const products = useSelector((state) => state.products.product);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleAddName = (e) => {
    setName(e.target.value);
  };

  const handleAddPrice = (e) => {
    setPrice(e.target.value);
  };
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(editProducts(price));
  };
  return (
    <div>
      {products?.map((item) => {
        return (
             
          <Grid className={classes.card}>
            {item.id}
            <img src={item.pathImages} alt="" />
            {item.name}
            {item.image}
            {item.price}
            {item.category}
            <Grid>
           
      {/* <TextField
        id="outlined-multiline-static"
        label="Введите имя"
        multiline
        rows={1}
        value={name}
        onChange={name}
        variant="outlined"
      /> */}
      <TextField
        id="outlined-multiline-static"
        label="Введите стоимость"
        multiline
        rows={1}
        value={price}
        onChange={item.price}
        variant="outlined"
      />

      <Button onClick={handleDelete} variant="contained" color="primary">
      изменить
      </Button>
    
              
              
              
              
              
              
              
              
                {/* <input type="text" value={item.price}/>
              <button
                onClick={() => {
                  handleDelete(item._id);
                }}
              >
                Удалить
              </button> */}
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}

export default MainPages2;
