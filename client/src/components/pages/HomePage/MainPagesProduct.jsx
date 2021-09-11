import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProductOne } from "../../../redux/features/productOne";
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

function MainPagesProduct(props) {
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
    dispatch(fetchProductOne(id));
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

export default MainPagesProduct;
