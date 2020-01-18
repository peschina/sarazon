import React from "react";
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
import CheckoutAddress from "./components/checkoutAddress";
import CheckoutPayment from "./components/checkoutPayment";
import CheckoutConfirmation from "./components/checkoutConfirmation";
import ProtectedRoute from "./components/protectedRoute";

const App = () => {
  return (
    <>
      <Navbar />
      <main>
        <Switch>
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/products" component={Products} />
          <ProtectedRoute path="/cart" component={Cart} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/orders" component={Orders} />
          <ProtectedRoute path="/wishlist" component={Wishlist} />
          <ProtectedRoute
            path="/checkout-address"
            exact
            component={CheckoutAddress}
          />
          <ProtectedRoute
            path="/checkout-payment"
            exact
            component={CheckoutPayment}
          />
          <ProtectedRoute
            path="/checkout-confirmation"
            exact
            component={CheckoutConfirmation}
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
