import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./AuthModal.module.css";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const getLoginSchema = () => yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Min 6 chars").required("Password is required"),
});

const getRegisterSchema = () => yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Min 6 chars").required("Password is required"),
});

const AuthModal = ({ onClose, type }) => {
  const [firebaseError, setFirebaseError] = useState(null);

  const schema = type === "register" ? getRegisterSchema() : getLoginSchema();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const onSubmit = async (data) => {
    setFirebaseError(null);
    try {
      if (type === "register") {
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        await updateProfile(userCredential.user, { displayName: data.name });

        // Create user document in Firestore users collection
        await setDoc(doc(db, "users", userCredential.user.uid), {
          name: data.name,
          email: data.email,
          favorites: [],
          createdAt: new Date().toISOString()
        });
      } else {
        await signInWithEmailAndPassword(auth, data.email, data.password);
      }
      onClose();
    } catch (error) {
      setFirebaseError(error.message);
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
        <h2 className={styles.title}>{type === "login" ? "Log In" : "Registration"}</h2>
        <p className={styles.description}>
          {type === "login"
            ? "Welcome back! Please enter your credentials to access your account."
            : "Thank you for your interest in our platform! Please provide us with some information."}
        </p>

        {firebaseError && <p className={styles.error} style={{ marginBottom: "15px" }}>{firebaseError}</p>}

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {type === "register" && (
            <>
              <input {...register("name")} placeholder="Name" className={styles.input} />
              {errors.name && <p className={styles.error}>{errors.name.message}</p>}
            </>
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
