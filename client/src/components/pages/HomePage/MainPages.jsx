import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

function MainPages() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const products = useSelector((state) => state.products.product);

  const handleDelete = (id) => {
    dispatch(removeProducts(id));
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
              <button
                onClick={() => {
                  handleDelete(item._id);
                }}
              >
                Удалить
              </button>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}

export default MainPages;
