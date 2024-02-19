import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

import styles from "../../styles/Header.module.css";

import LOGO from "../../images/logo.svg";
import AVATAR from "../../images/avatar.jpg";

import { useDispatch, useSelector } from "react-redux";
import { toggleForm } from "../../featerus/user/userSlice";
import { useEffect } from "react";

import { useGetProductsQuery } from "../../featerus/api/apiSlice";

export default function Header() {
  const { currentUser, cart } = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({ name: "Guest", avatar: AVATAR });
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (!currentUser) return;
    setValues(currentUser);
  }, [currentUser]);

  const { data, isLoading } = useGetProductsQuery({ title: searchValue });

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleClick = () => {
    if (!currentUser) dispatch(toggleForm(true));
    else navigate(ROUTES.PROFILE);
  };
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt="Staff" />
        </Link>
      </div>
      <div className={styles.info}>
        <div className={styles.user} onClick={handleClick}>
          <div
            className={styles.avatar}
            style={{ backgroundImage: `url(${values.avatar})` }}
          />
          <div className={styles.username}>{values.name}</div>
        </div>

        <form className={styles.form}>
          <div className={styles.icons}>
            <svg className={styles.icon}>
              <use
                xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`}
                width="16"
              />
            </svg>
          </div>

          <div className={styles.input}>
            <input
              type="search"
              name="search"
              placeholder="type your name"
              autoComplete="off"
              onChange={handleSearch}
              value={searchValue}
            />
          </div>

          {searchValue && (
            <div className={styles.box}>
              {isLoading
                ? "Loading"
                : !data.length
                ? "no result"
                : data.map(({ title, images, id }) => {
                    return (
                      <Link
                        key={id}
                        onClick={() => setSearchValue("")}
                        className={styles.item}
                        to={`/products/${id}`}
                      >
                        <div
                          className={styles.image}
                          style={{ backgroundImage: `url(${images[0]})` }}
                        />
                        <div className={styles.title}>{title}</div>
                      </Link>
                    );
                  })}
            </div>
          )}
        </form>
        <div className={styles.account}>
          <Link to="" className={styles.favorites}>
            <svg className={styles["icon-fav"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
            </svg>
          </Link>
          <Link to={ROUTES.CART} className={styles.cart}>
            <svg className={styles["icon-cart"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
            </svg>
            {!!cart.length && (
              <span className={styles.count}>{cart.length}</span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
