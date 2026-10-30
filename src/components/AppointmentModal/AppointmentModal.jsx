import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { push, ref, serverTimestamp, set } from "firebase/database";
import styles from "./AppointmentModal.module.css";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import Modal from "../Modal/Modal";

const schema = yup.object().shape({
  name: yup.string().trim().min(2, "Name must be at least 2 characters").required("Name is required"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  phone: yup.string().trim().min(7, "Enter a valid phone number").required("Phone is required"),
  date: yup.string().required("Date is required"),
  time: yup.string().required("Time is required"),
  comment: yup.string().trim().min(2, "Comment is required").max(500, "Comment is too long").required("Comment is required"),
});

const AppointmentModal = ({ psychologist, onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
      phone: "",
      date: "",
      time: "",
      comment: "",
    },
  });

  const onSubmit = async (data) => {
    if (!user) return;
    setSubmitError(null);

    try {
      const appointmentRef = push(ref(db, "appointments"));
      await set(appointmentRef, {
        schemaVersion: 1,
        userId: user.uid,
        psychologistId: psychologist.id,
        psychologistName: psychologist.name,
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        date: data.date,
        time: data.time,
        comment: data.comment.trim(),
        status: "pending",
        createdAt: serverTimestamp(),
      });
      onClose();
      navigate("/thank-you", { replace: true });
    } catch {
      setSubmitError("We could not send your appointment request. Please try again.");
    }
  };

  return (
    <Modal onClose={onClose} labelledBy="appointment-modal-title" describedBy="appointment-modal-description">
      <div className={styles.modal}>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close appointment dialog">
          <span aria-hidden="true">×</span>
        </button>
        <h2 id="appointment-modal-title" className={styles.title}>Make an appointment with a psychologist</h2>
        <p id="appointment-modal-description" className={styles.description}>
          You are about to book an appointment with <strong>{psychologist.name}</strong>. Please fill in the details below.
        </p>
        {submitError && <p className={styles.error} role="alert">{submitError}</p>}

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={styles.field}>
            <label htmlFor="appointment-name">Full name</label>
            <input
              id="appointment-name"
              {...register("name")}
              autoComplete="name"
              className={styles.input}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "appointment-name-error" : undefined}
            />
            {errors.name && <p id="appointment-name-error" className={styles.error} role="alert">{errors.name.message}</p>}
          </div>

          <div className={styles.inputRow}>
            <div className={styles.field}>
              <label htmlFor="appointment-phone">Phone</label>
              <input
                id="appointment-phone"
                {...register("phone")}
                type="tel"
                autoComplete="tel"
                className={styles.input}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "appointment-phone-error" : undefined}
              />
              {errors.phone && <p id="appointment-phone-error" className={styles.error} role="alert">{errors.phone.message}</p>}
            </div>
            <div className={styles.field}>
              <label htmlFor="appointment-date">Date</label>
              <input
                id="appointment-date"
                {...register("date")}
                type="date"
                className={styles.input}
                aria-invalid={Boolean(errors.date)}
                aria-describedby={errors.date ? "appointment-date-error" : undefined}
              />
              {errors.date && <p id="appointment-date-error" className={styles.error} role="alert">{errors.date.message}</p>}
            </div>
          </div>

          <div className={styles.inputRow}>
            <div className={styles.field}>
              <label htmlFor="appointment-time">Time</label>
              <input
                id="appointment-time"
                {...register("time")}
                type="time"
                className={styles.input}
                aria-invalid={Boolean(errors.time)}
                aria-describedby={errors.time ? "appointment-time-error" : undefined}
              />
              {errors.time && <p id="appointment-time-error" className={styles.error} role="alert">{errors.time.message}</p>}
            </div>
            <div className={styles.field}>
              <label htmlFor="appointment-email">Email</label>
              <input
                id="appointment-email"
                {...register("email")}
                type="email"
                autoComplete="email"
                className={styles.input}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "appointment-email-error" : undefined}
              />
              {errors.email && <p id="appointment-email-error" className={styles.error} role="alert">{errors.email.message}</p>}
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="appointment-comment">Comment or notes</label>
            <textarea
              id="appointment-comment"
              {...register("comment")}
              className={styles.input}
              rows={4}
              aria-invalid={Boolean(errors.comment)}
              aria-describedby={errors.comment ? "appointment-comment-error" : undefined}
            />
            {errors.comment && <p id="appointment-comment-error" className={styles.error} role="alert">{errors.comment.message}</p>}
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
            {isSubmitting ? "Sending…" : "Send request"}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AppointmentModal;
