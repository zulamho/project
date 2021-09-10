import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/HomePage";
import AddProduct from "./pages/ProfilePages/AddProduct";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import MainCategories from "./pages/HomePage/MainCategories";
import AddCategory from "./pages/ProfilePages/AddCategory";
import ProfilePages from "./pages/ProfilePages/ProfilePages";
import Test from "./pages/ProfilePages/Test";


function App() {
  
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route path="/signin">
            <SignInPage />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/addproduct" exact>
            <AddProduct />
          </Route>
          {/* <Route path="/editproduct" exact>
            < MainPages2 />
          </Route> */}
          <Route path="/profilePages" exact>
            < ProfilePages />
          </Route>
          <Route path="/product/categories" exact>
          <MainCategories/>
          </Route>
          <Route path="/test" exact>
          <Test/>
          </Route>
         
          {/* <Redirect to="/signin" /> */}
         
          
        </Switch>
      </BrowserRouter>
    );
  }


export default App;
