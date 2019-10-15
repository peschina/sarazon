import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DataView } from "primereact/dataview";
import { Dropdown } from "primereact/dropdown";
import { Panel } from "primereact/panel";
import { allProducts } from "../fakeProductService";

const Products = () => {
  const [products, setProducts] = useState(allProducts);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortKey, setSortKey] = useState(null);

  const itemTemplate = product => (
    <Link to={`/product/${product._id}`} className="p-col-6 p-md-4 p-lg-4">
      <Panel header={product.name} style={{ textAlign: "center" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <div>{product.description}</div>
        <div>{product.price}</div>
      </Panel>
    </Link>
  );

  const onSortChange = e => {
    const value = e.value;
    if (value.indexOf("!") === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
    } else {
      setSortOrder(1);
      setSortField(value);
      setSortKey(value);
    }
  };

  const renderHeader = () => {
    const sortOptions = [
      { label: "Newest First", value: "!year" },
      { label: "Oldest First", value: "year" },
      { label: "Price", value: "price" }
    ];

    const categories = [
      { label: "Books", value: "books" },
      { label: "Home & Kitchen", value: "homeKitchen" },
      { label: "Women fashion", value: "womenFashion" }
    ];

    return (
      <div className="p-grid">
        <div className="p-col-6 p-md-3 p-lg-2" style={{ textAlign: "left" }}>
          <Dropdown
            options={sortOptions}
            value={sortKey}
            placeholder="Sort By"
            onChange={onSortChange}
          />
        </div>
        <div className="p-col-6 p-md-3 p-lg-2" style={{ textAlign: "left" }}>
          <Dropdown
            options={categories}
            value={sortKey}
            placeholder="Categories"
            onChange={onSortChange}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="p-grid p-fluid ">
      <div className="p-col-12">
        <DataView
          value={products}
          layout="grid"
          header={renderHeader()}
          itemTemplate={itemTemplate}
          // paginatorPosition={'both'} paginator={true} rows={20}
          // sortOrder={sortOrder} sortField={sortField}
        />
      </div>
    </div>
  );
};

export default Products;
