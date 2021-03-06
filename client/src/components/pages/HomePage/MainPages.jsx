import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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

function MainPages(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  // const products = useSelector((state) => state.products.product);

  const products = useSelector((state) => {
    const { products } = state;

    if (products.filter === "") {
      return products.product;
    }


    return products.product.filter((item) => {
      console.log(products)
      return (
        item.name.toLowerCase().includes(products.filter.toLowerCase())

      );
    });
  });
  
  console.log(products)

  const handleDelete = (id) => {
    dispatch(removeProducts(id));
  };
  return (
    <div>
      {products?.map((item,index) => {
        return (
          <Grid className={classes.card}>
            {item._id}
            <img src={item.pathImages} alt="" />
            <Link to={item._id} >
            Изменить
            </Link>
            {item.image}
            {item.name}
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
