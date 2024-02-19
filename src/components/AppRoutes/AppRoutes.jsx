import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "../../Page/HomePage/HomePage";
import SingleProduct from "../SingleProduct/SingleProduct";
import { ROUTES } from "../../utils/routes";
import Profile from "../Profile/Profile";
import SingleCategory from "../Categories/SingleCategory";
import Cart from "../Cart/Cart";

export default function AppRoutes() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path={ROUTES.PRODUCT} element={<SingleProduct />} />
      <Route path={ROUTES.PROFILE} element={<Profile />} />
      <Route path={ROUTES.CATEGORY} element={<SingleCategory />} />
      <Route path={ROUTES.CART} element={<Cart />} />
    </Routes>
  );
}
