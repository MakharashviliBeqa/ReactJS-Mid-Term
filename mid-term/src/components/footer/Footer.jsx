import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.links}>
                    <span>Conditions to Use</span>
                    <span>Privacy Notice</span>
                    <span>Interest-based Ads</span>
                </div>
                <div className={styles.copy}>
                    &copy; 1996-2021, Amazon.com, Inc. or its affiliates
                </div>
            </div>
        </footer>
    );
}