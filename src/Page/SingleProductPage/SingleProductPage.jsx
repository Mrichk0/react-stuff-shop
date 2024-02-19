import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItemToCart } from "../../featerus/user/userSlice";
import styles from "../../styles/Product.module.css";
import { ROUTES } from "../../utils/routes";

const SIZES = [4, 4.5, 5];

const SingleProductPage = (items) => {
  const { images, price, title, description } = items;
  const dispatch = useDispatch();

  const [currentImage, setCurrentImage] = useState();
  const [currentSize, setCurrentSize] = useState();

  useEffect(() => {
    if (!images.length) return;
    setCurrentImage(images[0]);
  }, [images]);

  const addToCart = () => {
    dispatch(addItemToCart(items));
  };

  return (
    <section className={styles.product}>
      <div className={styles.images}>
        <div
          className={styles.current}
          style={{ backgroundImage: `url(${currentImage})` }}
        />
        <div className={styles["images-list"]}>
          {images.map((image, i) => (
            <div
              key={i}
              className={styles.image}
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => setCurrentImage(image)}
            />
          ))}
        </div>
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.price}>{price}</div>
        <div className={styles.color}>
          <span>Color: </span> Green
        </div>
        <div className={styles.color}>
          <span>Sizes: </span>{" "}
          <div className={styles.list}>
            {SIZES.map((size) => (
              <div
                key={size}
                onClick={() => setCurrentSize(size)}
                className={`${styles.size} ${
                  currentSize === size ? styles.active : ""
                }`}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
        <p className={styles.description}>{description}</p>
        <div className={styles.actions}>
          <button
            onClick={addToCart}
            className={styles.add}
            disabled={!currentSize}
          >
            Add to cart{" "}
          </button>
          <button className={styles.favourite}>favourites</button>
        </div>
        <div className={styles.bottom}>
          <div className={styles.purchase}> 19 people purchase </div>
          <Link to={ROUTES.HOME}>Return to store</Link>
        </div>
      </div>
    </section>
  );
};

export default SingleProductPage;
