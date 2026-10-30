import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, serverTimestamp, set } from "firebase/database";
import styles from "./AuthModal.module.css";
import { auth, db } from "../../firebase";
import Modal from "../Modal/Modal";

const getLoginSchema = () => yup.object().shape({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const getRegisterSchema = () => yup.object().shape({
  name: yup.string().trim().min(2, "Name must be at least 2 characters").required("Name is required"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const getFirebaseErrorMessage = (error) => {
  const messages = {
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/invalid-credential": "The email or password is incorrect.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/weak-password": "Choose a stronger password.",
    "auth/user-disabled": "This account is unavailable.",
    "auth/user-not-found": "The email or password is incorrect.",
    "auth/wrong-password": "The email or password is incorrect.",
  };

  return messages[error?.code] || "We could not complete that request. Please try again.";
};

const AuthModal = ({ onClose, type }) => {
  const [firebaseError, setFirebaseError] = useState(null);
  const schema = type === "register" ? getRegisterSchema() : getLoginSchema();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setFirebaseError(null);

    try {
      if (type === "register") {
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        await updateProfile(userCredential.user, { displayName: data.name.trim() });
        await set(ref(db, `users/${userCredential.user.uid}`), {
          name: data.name.trim(),
          email: data.email.trim(),
          favorites: {},
          createdAt: serverTimestamp(),
        });
      } else {
        await signInWithEmailAndPassword(auth, data.email, data.password);
      }

      reset();
      onClose();
    } catch (error) {
      setFirebaseError(getFirebaseErrorMessage(error));
    }
  };

  const title = type === "login" ? "Log In" : "Registration";
  const description = type === "login"
    ? "Welcome back! Please enter your credentials to access your account."
    : "Thank you for your interest in our platform! Please provide us with some information.";

  return (
    <Modal onClose={onClose} labelledBy="auth-modal-title" describedBy="auth-modal-description">
      <div className={styles.modal}>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close authentication dialog">
          <span aria-hidden="true">×</span>
        </button>
        <h2 id="auth-modal-title" className={styles.title}>{title}</h2>
        <p id="auth-modal-description" className={styles.description}>{description}</p>

        {firebaseError && <p className={styles.error} role="alert">{firebaseError}</p>}

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          {type === "register" && (
            <div className={styles.field}>
              <label htmlFor="auth-name">Name</label>
              <input
                id="auth-name"
                {...register("name")}
                autoComplete="name"
                className={styles.input}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "auth-name-error" : undefined}
              />
              {errors.name && <p id="auth-name-error" className={styles.error} role="alert">{errors.name.message}</p>}
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="auth-email">Email</label>
            <input
              id="auth-email"
              {...register("email")}
              type="email"
              autoComplete="email"
              className={styles.input}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "auth-email-error" : undefined}
            />
            {errors.email && <p id="auth-email-error" className={styles.error} role="alert">{errors.email.message}</p>}
          </div>

          <div className={styles.field}>
            <label htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              {...register("password")}
              type="password"
              autoComplete={type === "login" ? "current-password" : "new-password"}
              className={styles.input}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "auth-password-error" : undefined}
            />
            {errors.password && <p id="auth-password-error" className={styles.error} role="alert">{errors.password.message}</p>}
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
            {isSubmitting ? "Please wait…" : type === "login" ? "Log In" : "Sign Up"}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AuthModal;
