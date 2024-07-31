// layout.js
import styles from "./globals.css"; // Ensure the correct relative path to your globals.css file

export default function RootLayout({ children }) {
  return (
    <html className={styles.html}>
      <body className={styles.body}>{children}</body>
    </html>
  );
} 
