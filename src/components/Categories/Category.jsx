import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import styles from "../../styles/Category.module.css";

import { useGetProductsQuery } from "../../featerus/api/apiSlice";
import { useState } from "react";

import { Products } from "../Products/Products";
import { useSelector } from "react-redux";

function Category() {
  const { id } = useParams();
  const { categoriesList } = useSelector(({ categories }) => categories);

  const defaultValues = useMemo(
    () => ({
      title: "",
      limit: 5,
      offset: 0,
      price_min: 0,
      price_max: 0,
    }),
    []
  );

  const defaultParams = useMemo(
    () => ({
      ...defaultValues,
      categoryId: id,
    }),
    [id, defaultValues]
  );
  const [isEnd, setEnd] = useState(false);
  const [cat, setCat] = useState(null);
  const [items, setItems] = useState([]);
  const [values, setValues] = useState(defaultValues);
  const [params, setParams] = useState(defaultParams);

  const { data, isLoading, isSuccess } = useGetProductsQuery(params);

  useEffect(() => {
    if (isLoading || data === undefined) return;
    if (!data.length) return setEnd(true);

    const products = Object.values(data);
    if (!products.length) return;
    setItems((_items) => [..._items, ...products]);
  }, [isLoading, data]);

  useEffect(() => {
    if (!id) return;
    setValues(defaultValues);
    setEnd(false);
    setItems([]);

    setParams({ ...defaultParams, categoryId: id });
  }, [id, defaultParams, defaultValues]);

  useEffect(() => {
    if (!id || !categoriesList.length) return;
    const category = categoriesList.find((item) => item.id === id * 1);
    setCat(category);
  }, [id, categoriesList]);

  const handleSearch = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setItems([]);
    setEnd(false);

    setParams({ ...defaultParams, ...values });
  };

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{cat?.name}</h2>
      <form className={styles.filters} onSubmit={handleSubmit}>
        <div className={styles.filter}>
          <input
            type="text"
            name="title"
            onChange={handleSearch}
            placeholder="product name"
            value={values.title}
          />
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_min"
            onChange={handleSearch}
            placeholder="0"
            value={values.price_min}
          />
          <span>from</span>
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_max"
            onChange={handleSearch}
            placeholder="0"
            value={values.price_max}
          />
          <span>to</span>
        </div>
        <button type="submit" hidden />
      </form>

      {isLoading ? (
        <div className="preloader">Loading...</div>
      ) : !isSuccess || !items.length ? (
        <div className={styles.back}>
          <span>no result</span> <button>reset</button>
        </div>
      ) : (
        <Products
          title=""
          products={items}
          amount={items.length}
          style={{ padding: 0 }}
        />
      )}
      {!isEnd && (
        <div className={styles.more}>
          <button
            onClick={() => {
              setParams({ ...params, offset: params.offset + params.limit });
            }}
          >
            see more
          </button>
        </div>
      )}
    </section>
  );
}

export default Category;
