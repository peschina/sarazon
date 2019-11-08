import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Home from "./components/home";
import Login from "./components/login";
import Navbar from "./components/navbar";
import NotFound from "./components/notFound";
import Products from "./components/products";
import ProductPage from "./components/productPage";
import Register from "./components/register";
import Profile from "./components/profile";
import Cart from "./components/cart";
import Contact from "./components/contact";
import Wishlist from "./components/wishlist";
import Orders from "./components/orders";

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log("mounted");
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      setUser(user);
    } catch (err) {}
  }, []);

  return (
    <>
      <Navbar user={user} />
      <main>
        <Switch>
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/products" component={Products} />
          <Route path="/cart" component={Cart} />
          <Route path="/wishlist" component={Wishlist} />
          <Route path="/orders" component={Orders} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/contact" component={Contact} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact component={Home} />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </>
  );
};

export default App;
