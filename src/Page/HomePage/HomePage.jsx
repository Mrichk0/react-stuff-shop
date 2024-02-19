import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../../components/Banner/Banner";
import Categories from "../../components/Categories/Categories";
import { Poster } from "../../components/Poster/Poster";
import { Products } from "../../components/Products/Products";
import { filterByPrice } from "../../featerus/products/productsSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const {
    products: { productsList, filtered },
    categories,
  } = useSelector((state) => state);
  useEffect(() => {
    if (!productsList.length) return;
    dispatch(filterByPrice(100));
  }, [dispatch, productsList]);

  return (
    <>
      <Poster />
      <Products products={productsList} amount={5} title="Trending" />
      <Categories
        categories={categories.categoriesList}
        amount={5}
        title="Worth seeing"
      />
      <Banner />
      <Products products={filtered} amount={5} title="less then 100$ " />
    </>
  );
}
