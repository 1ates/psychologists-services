import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./AuthModal.module.css";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Min 6 chars").required("Password is required"),
});

const AuthModal = ({ onClose, type }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const onSubmit = (data) => {
    console.log(type, data);
    // Firebase auth logic here
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
        <h2 className={styles.title}>{type === "login" ? "Log In" : "Registration"}</h2>
        <p className={styles.description}>Welcome back! Please enter your details.</p>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {type === "register" && (
            <input {...register("name")} placeholder="Name" className={styles.input} />
          )}
          <input {...register("email")} placeholder="Email" className={styles.input} />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          <input {...register("password")} type="password" placeholder="Password" className={styles.input} />
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}

          <button type="submit" className={styles.submitBtn}>
            {type === "login" ? "Log In" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
