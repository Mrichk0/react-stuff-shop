import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Profile.module.css";
import { updateUser } from "../../featerus/user/userSlice";
import { useEffect } from "react";

function Profile() {
  const [values, setValue] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const dispatch = useDispatch();
  const { currentUser } = useSelector(({ user }) => user);

  useEffect(() => {
    setValue(currentUser);
  }, [currentUser]);

  const handleChange = ({ target: { name, value } }) => {
    setValue({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isNotEmpty = Object.values(values).some((vel) => !vel);
    if (isNotEmpty) return;
    dispatch(updateUser(values));
  };
  return (
    <div className={styles.profile}>
      {!currentUser ? (
        <span>you need login</span>
      ) : (
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
              type="name"
              name="name"
              placeholder="your name"
              value={values.name}
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
          <div className={styles.group}>
            <input
              type="avatar"
              name="avatar"
              placeholder="your avatar"
              value={values.avatar}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.submit}>
            Update user
          </button>
        </form>
      )}
    </div>
  );
}

export default Profile;
