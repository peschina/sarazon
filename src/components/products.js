import React, { useState } from "react";
import { DataView } from "primereact/dataview";
import { Dropdown } from "primereact/dropdown";
import { Panel } from "primereact/panel";
import yarn from "../img/yarn.jpg";

const Products = () => {
  const [products, setProducts] = useState([
    {
      name: "Black Top",
      description: "nice black top",
      price: "€30",
      category: "Women fashion"
    },
    {
      name: "White shorts",
      description: "skinny White shorts",
      price: "€45",
      category: "Women fashion"
    },
    {
      name: "Harry Potter and the Goblet of Fire",
      description: "the illustrated edition",
      price: "€15",
      category: "Books"
    },
    {
      name: "The Hound of the Baskervilles",
      description: "by Sir Arthur Conan Doyle",
      price: "€7",
      category: "Books"
    },
    {
      name: "Shaker Bottle",
      description: "28-ounce, black",
      price: "€10",
      category: "Home & Kitchen"
    },
    {
      name: "Electic hot water kettle",
      description: "stainless steel",
      price: "€25",
      category: "Home & Kitchen"
    }
  ]);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortKey, setSortKey] = useState(null);

  const itemTemplate = product => (
    <div className="p-col-4">
      <Panel header={product.name} style={{ textAlign: "center" }}>
        <img src={yarn} alt={product.name} />
        <div>{product.description}</div>
        <div>{product.price}</div>
      </Panel>
    </div>
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
        <div className="p-col-2" style={{ textAlign: "left" }}>
          <Dropdown
            options={sortOptions}
            value={sortKey}
            placeholder="Sort By"
            onChange={onSortChange}
          />
        </div>
        <div className="p-col-2" style={{ textAlign: "left" }}>
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
          // sortOrder={this.state.sortOrder} sortField={this.state.sortField}
        />
        {/* <Dialog
          header="Car Details"
          visible={this.state.visible}
          width="225px"
          modal={true}
          onHide={() => this.setState({ visible: false })}
        >
          {this.renderCarDialogContent()}
        </Dialog> */}
      </div>
    </div>
  );
};

export default Products;
