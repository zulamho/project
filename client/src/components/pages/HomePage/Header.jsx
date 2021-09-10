import { Container } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) =>
  createStyles({
    cardGrid: {
      backgroundColor: "white",
      padding: "0",
    },

    head: {
      width: "100%",
      height: "90px",
      background: "blue",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },

    cardH2: {
      color: "black",
      textDecoration: "none"
    },

    links: {
      color: "white",
      width: "400px",
      display: "flex",
      justifyContent: "space-around",
    },

    link: {
      color: "white",
      textDecoration: "none",
    },
  })
);

function Header() {
  const classes = useStyles();

  const token = useSelector((state) => state.application.token);

  if (!token) {
    return (
      <Container className={classes.cardGrid} maxWidth="100%">
        <Grid container className={classes.all}>
          <Grid item className={classes.head}>
            <h2 className={classes.cardH2}><NavLink to="/">Квадрокоптеры</NavLink></h2>
            <Grid item className={classes.links}>
              <NavLink className={classes.link} to={"/signin"}>
                Авторизоваться
              </NavLink>
              <NavLink className={classes.link} to={"/signup"}>
                Зарегестрироваться
              </NavLink>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
  return (
    <Container className={classes.cardGrid} maxWidth="100%">
      <Grid container className={classes.all}>
        <Grid item className={classes.head}>
          <h2><NavLink  className={classes.cardH2} to="/">Квадрокоптеры</NavLink></h2>
          <Grid item className={classes.links}>
            <NavLink className={classes.link} to={"/profilePages"}>
              Личный кабинет
            </NavLink>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Header;
