import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Navbar from "./components/navbar";
import NotFound from "./components/notFound";
import Products from "./components/products";
import Register from "./components/register";

const App = ({ history }) => {
  return (
    <>
      <Navbar />
      <main>
        <Switch>
          <Route path="/products" component={Products} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact component={Home} />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </>
  );
};

export default App;
