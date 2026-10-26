import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./AppointmentModal.module.css";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  time: yup.string().required("Time is required"),
  comment: yup.string(),
});

const AppointmentModal = ({ psychologist, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const onSubmit = (data) => {
    console.log("Appointment submitted:", { psychologist: psychologist.name, ...data });
    alert("Appointment successfully requested!");
    onClose();
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
        <h2 className={styles.title}>Make an appointment with a psychologist</h2>
        <p className={styles.description}>
          You are about to book an appointment with <strong>{psychologist.name}</strong>. Please fill in the details below.
        </p>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input {...register("name")} placeholder="Full Name" className={styles.input} />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}

          <div className={styles.inputRow}>
            <div>
              <input {...register("phone")} placeholder="Phone" className={styles.input} />
              {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
            </div>
            <div>
              <input {...register("time")} type="time" placeholder="00:00" className={styles.input} />
              {errors.time && <p className={styles.error}>{errors.time.message}</p>}
            </div>
          </div>

          <input {...register("email")} placeholder="Email" className={styles.input} />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}

          <textarea {...register("comment")} placeholder="Comment / Notes" className={styles.input} rows={4} />

          <button type="submit" className={styles.submitBtn}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
