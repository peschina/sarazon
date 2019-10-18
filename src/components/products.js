import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DataView } from "primereact/dataview";
import { Dropdown } from "primereact/dropdown";
import { Panel } from "primereact/panel";
import { MultiSelect } from "primereact/multiselect";
import { allProducts } from "../fakeProductService";

const Products = () => {
  const [products, setProducts] = useState(allProducts);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortKey, setSortKey] = useState(null);
  const [categories, setCategories] = useState(null);

  const itemTemplate = ({ _id, name, image, description, price }) => (
    <Link to={`/product/${_id}`} className="p-col-6 p-md-4 p-lg-4">
      <Panel header={name} style={{ textAlign: "center" }}>
        <img
          src={image}
          alt={name}
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <div>{description}</div>
        <div>{price}</div>
      </Panel>
    </Link>
  );

  const onSortChange = ({ value }) => {
    if (value.indexOf("!") === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
      return;
    }
    setSortOrder(1);
    setSortField(value);
    setSortKey(value);
  };

  const renderHeader = () => {
    const sortOptions = [
      { label: "Newest First", value: "!insertionDate" },
      { label: "Oldest First", value: "insertionDate" },
      { label: "Price: crescent", value: "price" },
      { label: "Price: decrescent", value: "!price" }
    ];

    const categoriesSelectItem = [
      { label: "Books", value: "books" },
      { label: "Home & Kitchen", value: "homeKitchen" },
      { label: "Women fashion", value: "womenFashion" }
    ];

    return (
      <div className="p-grid">
        <div className="p-col-6 p-md-3 p-lg-2" style={{ textAlign: "left" }}>
          <MultiSelect
            value={categories}
            placeholder="Categories"
            options={categoriesSelectItem}
            filter={true}
            onChange={e => setCategories(e.value)}
          />
        </div>
        <div className="p-col-6 p-md-3 p-lg-2" style={{ textAlign: "left" }}>
          <Dropdown
            options={sortOptions}
            value={sortKey}
            placeholder="Sort By"
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
          paginatorPosition={"both"}
          paginator={true}
          rows={6}
          sortOrder={sortOrder}
          sortField={sortField}
        />
      </div>
    </div>
  );
};

export default Products;
