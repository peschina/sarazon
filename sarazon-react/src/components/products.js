import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { DataView } from "primereact/dataview";
import { Dropdown } from "primereact/dropdown";
import { Panel } from "primereact/panel";
import { MultiSelect } from "primereact/multiselect";
import { allProducts, filterByCategory } from "../fakeProductService";
import { getProducts } from "../services/productService";

const Products = props => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortKey, setSortKey] = useState(null);
  const [categories, setCategories] = useState([]);

  const filter = useCallback(() => setProducts(filterByCategory(categories)), [
    categories
  ]);

  function useDidUpdateEffect(fn, dependency) {
    const didMountRef = useRef(false);

    useEffect(() => {
      if (!didMountRef.current) {
        didMountRef.current = true;
        return;
      }
      fn();
    }, [dependency, fn]);
  }

  useEffect(() => {
    if (props.location.state) setCategories(props.location.state.category);
  }, [props.location.state]);

  useEffect(() => {
    const loadData = async () => {
      const { data } = await getProducts();
      setProducts(data);
    };
    loadData();
  }, []);

  useDidUpdateEffect(filter, categories);

  const itemTemplate = product => {
    if (!product) return null;
    const { _id, name, image, price } = product;
    return (
      <Link to={`/product/${_id}`} className="p-col-6 p-md-4 p-lg-4">
        <Panel header={name} style={{ textAlign: "center" }}>
          <img
            src={image}
            alt={name}
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <div>{price}</div>
        </Panel>
      </Link>
    );
  };

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

  const onFilterChange = ({ value }) => setCategories(value);

  const renderHeader = () => {
    const sortOptions = [
      { label: "Newest First", value: "!insertionDate" },
      { label: "Oldest First", value: "insertionDate" },
      { label: "Price: crescent", value: "price" },
      { label: "Price: decrescent", value: "!price" }
    ];

    const categoriesSelectItem = [
      { label: "Books", value: "Books" },
      { label: "Home & Kitchen", value: "Home & Kitchen" },
      { label: "Women fashion", value: "Women fashion" }
    ];

    return (
      <div className="p-grid">
        <div className="p-col-6 p-md-3 p-lg-2" style={{ textAlign: "left" }}>
          <MultiSelect
            value={categories}
            placeholder="Categories"
            options={categoriesSelectItem}
            onChange={onFilterChange}
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
