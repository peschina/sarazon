import React from "react";
import { withRouter } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import auth from "../services/authService";

const Navbar = () => {
  const user = auth.getCurrentUser();

  const items = [
    {
      label: "Home",
      url: "/",
      icon: "pi pi-home"
    },
    {
      label: "Shop",
      url: "/products",
      icon: "pi pi-list"
    },
    {
      label: "Cart",
      url: "/cart",
      icon: "pi pi-shopping-cart"
    },
    {
      label: user ? "Personal area" : "Login",
      url: user ? null : "/login",
      icon: user ? "pi pi-user" : "pi pi-sign-in",
      items: user
        ? [
            {
              label: "Profile",
              url: "/profile",
              icon: "pi pi-user-edit"
            },
            {
              label: "Orders",
              url: "/orders",
              icon: "pi pi-file"
            },
            {
              label: "Wishlist",
              url: "/wishlist",
              icon: "pi pi-bookmark"
            },
            {
              label: "Logout",
              url: "/logout",
              icon: "pi pi-power-off"
            }
          ]
        : null
    },
    {
      label: "Contacts",
      url: "/contact",
      icon: "pi pi-info"
    }
  ];

  const logo = [
    {
      label: "Sarazon"
    }
  ];

  return (
    <div className="p-grid p-justify-between" style={{ marginBottom: "1em" }}>
      <Menubar
        model={logo}
        className="p-col-12 ui-menubar-custom"
        style={{ fontSize: "20px" }}
      ></Menubar>
      <Menubar
        model={items}
        className="p-col-12"
        style={{ textAlign: "center" }}
      ></Menubar>
    </div>
  );
};

export default withRouter(Navbar);
