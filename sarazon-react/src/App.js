import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Navbar from "./components/navbar";
import NotFound from "./components/notFound";
import Products from "./components/products";
import ProductPage from "./components/productPage";
import Register from "./components/register";
import Profile from "./components/profile";
import Logout from "./components/logout";
import Cart from "./components/cart";
import Contact from "./components/contact";
import Wishlist from "./components/wishlist";
import Orders from "./components/orders";
import auth from "./services/authService";

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = auth.getCurrentUser();
    setUser(user);
  }, []);

  return (
    <>
      <Navbar user={user} />
      <main>
        <Switch>
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/products" component={Products} />
          <Route path="/cart" component={Cart} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route
            path="/profile"
            render={props => {
              if (!user) return <Redirect to="/login" />;
              return <Profile />;
            }}
          />
          <Route
            path="/orders"
            render={props => {
              if (!user) return <Redirect to="/login" />;
              return <Orders />;
            }}
          />
          <Route
            path="/wishlist"
            render={props => {
              if (!user) return <Redirect to="/login" />;
              return <Wishlist />;
            }}
          />
          <Route path="/logout" component={Logout} />
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
