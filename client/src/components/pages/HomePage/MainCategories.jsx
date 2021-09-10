import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, removeCategory } from "../../../redux/features/categories";
import { NavLink } from "react-router-dom";


const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      backgroundColor: "gainsboro",
      padding: "0",
    },
  })
);

function MainCategories(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const categories = useSelector((state) => state.products.product);
  console.log(categories)
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(removeCategory(id));
  };
  return (
    <div>
      {categories?.map((item) => {
        return (
          <Grid className={classes.card}>
            {item._id}
            
            <Grid>
            <NavLink className={classes.link} to={item._id}>
            {item.name}
            </NavLink>
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

export default MainCategories;
