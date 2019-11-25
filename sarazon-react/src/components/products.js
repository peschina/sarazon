import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { DataView } from "primereact/dataview";
import { Dropdown } from "primereact/dropdown";
import { Panel } from "primereact/panel";
import { MultiSelect } from "primereact/multiselect";
import { getProducts, getProductsByCategory } from "../services/productService";
import { getCategories } from "./../services/categoryService";

const Products = props => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortKey, setSortKey] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const { data: products } = await getProducts();
      setProducts(products);
      const { data: categories } = await getCategories();
      categories.forEach(c => {
        c.label = c.name;
        c.value = c.name;
      });
      setAllCategories(categories);
    };
    loadProducts();
  }, []);

  const filter = useCallback(async () => {
    if (selectedCategories.length === 0) return;
    if (allCategories.length === 0) return;
    const selected = selectedCategories.map(c => {
      return {
        _id: allCategories.filter(cat => cat.name == c)[0]._id,
        name: c
      };
    });
    const selectedProducts = await Promise.all(
      selected.map(async c => {
        const { data } = await getProductsByCategory(c);
        return data;
      })
    );
    const merged = [].concat.apply([], selectedProducts);
    setProducts(merged);
  }, [selectedCategories, allCategories]);

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
    if (props.location.state)
      setSelectedCategories([props.location.state.category]);
  }, [props.location.state]);

  useDidUpdateEffect(filter, selectedCategories);

  const itemTemplate = product => {
    if (!product) return null;
    const { _id, name, category, price } = product;
    return (
      <Link to={`/product/${_id}`} className="p-col-6 p-md-4 p-lg-4">
        <Panel header={name} className="textCenter">
          <img
            src={`http://localhost:3090/images/products/${category.name}/${name}.jpg`}
            alt={name}
          />
          <div>€ {price}</div>
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

  const onFilterChange = ({ value }) => setSelectedCategories(value);

  const renderHeader = () => {
    const sortOptions = [
      { label: "Newest First", value: "!insertionDate" },
      { label: "Oldest First", value: "insertionDate" },
      { label: "Price: crescent", value: "price" },
      { label: "Price: decrescent", value: "!price" }
    ];

    return (
      <div className="p-grid">
        <div className="p-col-6 p-md-3 p-lg-2" style={{ textAlign: "left" }}>
          <MultiSelect
            value={selectedCategories}
            placeholder="Categories"
            options={allCategories}
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
