import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategories } from "../../featerus/categories/categoriesSlice";
import { getProducts } from "../../featerus/products/productsSlice";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import AppRoutes from "../AppRoutes/AppRoutes";
import Sidebar from "../Sidebar/Sidebar";
import UserForm from "../../featerus/user/UserForm";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <UserForm />

      <div className="container">
        <Sidebar />

        <AppRoutes />
      </div>

      <Footer />
    </div>
  );
}
