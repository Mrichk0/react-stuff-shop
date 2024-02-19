import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

import styles from "../../styles/Footer.module.css";

import LOGO from "../../images/logo.svg";

export default function Footer() {
  return (
    <section className={styles.footer}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt="Staff" />
        </Link>
      </div>

      <div className={styles.rights}>develop by BM</div>
      <div className={styles.socials}>
        <a href="https://insagram.com">
          <svg className="icon">
            <use
              xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#instagram`}
              width="16"
            />
          </svg>
        </a>
        <a href="https://facebook.com">
          <svg className="icon">
            <use
              xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#facebook`}
              width="16"
            />
          </svg>
        </a>
        <a href="https://youtube.com">
          <svg className="icon">
            <use
              xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#youtube`}
              width="16"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
