import { Link } from "react-router-dom";
import styles from "./PrivacyPolicy.module.css";

const PrivacyPolicy = () => (
  <section className={styles.container} aria-labelledby="privacy-title">
    <h1 id="privacy-title" className={styles.title}>Privacy Policy</h1>
    <p className={styles.lastUpdated}>Last updated: October 27, 2026</p>

    <p className={styles.intro}>
      This Privacy Policy explains how your personal data is collected, used, stored, and shared by the
      Psychologists Services web application ("Application"). It outlines our obligations under the
      <strong>Turkish Personal Data Protection Law (KVKK, Law No. 6698)</strong> and the
      <strong>General Data Protection Regulation (GDPR)</strong>.
    </p>

    <h2 className={styles.subtitle}>1. Personal Data Collected</h2>
    <p className={styles.text}>
      We may collect personal data in the following categories:
    </p>
    <ul className={styles.list}>
      <li className={styles.listItem}>Identity information: name, surname, email address, password (stored encrypted)</li>
      <li className={styles.listItem}>Contact information: phone number</li>
      <li className={styles.listItem}>Appointment details: psychologist selection, date, time, notes/comments</li>
      <li className={styles.listItem}>Favorite psychologists list (user-specific)</li>
      <li className={styles.listItem}>Authentication status and session information</li>
    </ul>

    <h2 className={styles.subtitle}>2. Purposes of Data Processing</h2>
    <ul className={styles.list}>
      <li className={styles.listItem}>User account creation and authentication</li>
      <li className={styles.listItem}>Viewing and searching psychologist profiles</li>
      <li className={styles.listItem}>Receiving and managing appointment requests</li>
      <li className={styles.listItem}>Maintaining and displaying the favorite psychologists list</li>
      <li className={styles.listItem}>Customer support and communication</li>
      <li className={styles.listItem}>Improving the application and ensuring security</li>
    </ul>

    <h2 className={styles.subtitle}>3. Data Sharing and Transfer</h2>
    <p className={styles.text}>
      Your personal data may be shared with the relevant psychologist in connection with your appointment request.
      Your data is securely stored and processed via the Firebase Realtime Database infrastructure.
      It is not sold to third parties or used for commercial purposes.
    </p>

    <h2 className={styles.subtitle}>4. Data Retention Period</h2>
    <p className={styles.text}>
      Your personal data is retained for as long as necessary for the processing purposes.
      Appointment records may be retained for the legally required retention period. Upon your account
      deletion request, your data is deleted or anonymized to the extent permitted by legal obligations.
    </p>

    <h2 className={styles.subtitle}>5. User Rights (KVKK and GDPR)</h2>
    <p className={styles.text}>
      Under KVKK and GDPR, you have the following rights:
    </p>
    <ul className={styles.list}>
      <li className={styles.listItem}>To learn whether your personal data is being processed</li>
      <li className={styles.listItem}>To request access to your data</li>
      <li className={styles.listItem}>To rectify inaccurate or incomplete data</li>
      <li className={styles.listItem}>To request deletion, destruction, or anonymization of your data</li>
      <li className={styles.listItem}>To withdraw your consent to processing</li>
      <li className={styles.listItem}>To request data portability</li>
      <li className={styles.listItem}>To file a complaint with a supervisory authority</li>
    </ul>

    <h2 className={styles.subtitle}>6. Data Security</h2>
    <p className={styles.text}>
      Technical and administrative measures are taken to protect the security of your personal data.
      Passwords are stored encrypted and protection measures against unauthorized access are implemented.
      However, we cannot guarantee that data transmission over the internet is 100% secure.
    </p>

    <h2 className={styles.subtitle}>7. Cookies and Similar Technologies</h2>
    <p className={styles.text}>
      The Application may use cookies for session management and to remember your preferences.
      You can disable cookies through your browser settings, but some features may not work properly as a result.
    </p>

    <h2 className={styles.subtitle}>8. Changes to This Policy</h2>
    <p className={styles.text}>
      This privacy policy may be updated from time to time. Changes will be announced through the Application
      and reflected on this page. The last update date is indicated at the top of the page.
    </p>

    <h2 className={styles.subtitle}>9. Contact</h2>
    <p className={styles.text}>
      For your requests, complaints, or questions regarding your personal data or this policy, you can contact us at:
    </p>
    <address className={styles.address}>
      <p>Psychologists Services Support Team</p>
      <p>Email: privacy@psychologists-services.example</p>
    </address>

    <div className={styles.actions}>
      <Link to="/" className={styles.backLink}>Back to Home</Link>
    </div>
  </section>
);

export default PrivacyPolicy;
