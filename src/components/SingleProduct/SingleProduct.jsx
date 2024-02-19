import React from "react";
import { useEffect } from "react";
// import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductQuery } from "../../featerus/api/apiSlice";
import SingleProductPage from "../../Page/SingleProductPage/SingleProductPage";
import { Products } from "../Products/Products";
import { useDispatch, useSelector } from "react-redux";
import { getRelatedProducts } from "../../featerus/products/productsSlice";

function SingleProduct() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data, isLoading, isSuccess, isFetching } = useGetProductQuery({ id });
  const navigate = useNavigate();
  const { related, productsList } = useSelector(({ products }) => products);
  useEffect(() => {
    if (!isSuccess && !isLoading && !isFetching) {
      navigate("/");
    }
  }, [isLoading, isSuccess, isFetching, navigate]);

  useEffect(() => {
    if (!productsList.length || !data) return;
    if (data) {
      dispatch(getRelatedProducts(data.category.id));
    }
  }, [data, productsList.length, dispatch]);

  return !data ? (
    <section> ...loading</section>
  ) : (
    <>
      <SingleProductPage {...data} />
      <Products products={related} amount={5} title="Related products" />
    </>
  );
}

export default SingleProduct;
