import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Menubar } from "primereact/menubar";

const Navbar = ({ history }) => {
  const navigateToPage = path => history.push(path);
  const items = [
    {
      label: "Shop",
      items: [
        {
          label: "Products",
          command: () => navigateToPage("/products")
        },
        {
          label: "Sales"
        }
      ]
    },
    {
      label: "Cart",
      icon: "pi pi-shopping-cart"
    },
    {
      label: "Personal area",
      items: [
        {
          label: "Login",
          command: () => navigateToPage("/login")
        },
        {
          label: "Profile"
        },
        {
          label: "Orders"
        },
        {
          label: "Wishlist"
        },
        {
          label: "Logout",
          icon: "pi pi-power-off"
        }
      ]
    },
    {
      label: "About"
    },
    {
      label: "Contacts"
    }
  ];

  return (
    <div className="p-grid">
      <div className="p-col-4">
        <Link to="/">Logo</Link>
      </div>
      <div className="p-col-6 p-offset-2">
        <Menubar model={items}></Menubar>
      </div>
    </div>
  );
};

export default withRouter(Navbar);
