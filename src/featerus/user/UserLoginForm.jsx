import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, toggleType } from "../../featerus/user/userSlice";

import styles from "../../styles/User.module.css";

const UserLoginForm = ({ closeForm }) => {
  const [values, setValue] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleChange = ({ target: { name, value } }) => {
    setValue({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isNotEmpty = Object.values(values).some((vel) => !vel);
    if (isNotEmpty) return;
    dispatch(loginUser(values));

    closeForm();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>
      <h3 className={styles.title}> Sing Up</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.group}>
          <input
            type="email"
            name="email"
            placeholder="your email"
            value={values.email}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.group}>
          <input
            type="password"
            name="password"
            placeholder="your password"
            value={values.password}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>
        <div
          className={styles.link}
          onClick={() => {
            dispatch(toggleType("singup"));
          }}
        >
          registered
        </div>
        <button type="submit" className={styles.submit}>
          Create an account
        </button>
      </form>
    </div>
  );
};

export default UserLoginForm;
