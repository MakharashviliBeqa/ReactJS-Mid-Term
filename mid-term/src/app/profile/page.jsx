"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./ProfilePage.module.css";

// Single line comment: Formik + Yup login/register page with validation and remember me

const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
});

export default function ProfilePage() {
    const router = useRouter();
    const [loggedInUser, setLoggedInUser] = useState(null);

    // Load logged in user from localStorage if Remember Me was checked
    useEffect(() => {
        const storedUser = localStorage.getItem("loggedInUser");
        if (storedUser) {
            setLoggedInUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        setLoggedInUser(null);
        localStorage.removeItem("loggedInUser");
    };

    if (loggedInUser) {
        // Show profile info
        return (
            <div className={styles.page}>
                <div className={styles.card}>
                    <h2 className={styles.title}>Welcome, {loggedInUser.username}!</h2>
                    <p>Email: {loggedInUser.email}</p>
                    <p>Firstname: {loggedInUser.firstname}</p>
                    <p>Lastname: {loggedInUser.lastname}</p>
                    <button onClick={handleLogout} className={styles.logoutBtn}>
                        Logout
                    </button>
                </div>
            </div>
        );
    }

    // Login form
    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h2 className={styles.title}>Login</h2>

                <Formik
                    initialValues={{ username: "", password: "", rememberMe: false }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        const users = JSON.parse(localStorage.getItem("users")) || [];
                        const matchedUser = users.find(
                            (u) => u.username === values.username && u.password === values.password
                        );

                        if (matchedUser) {
                            if (values.rememberMe) {
                                localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
                            }
                            setLoggedInUser(matchedUser);
                        } else {
                            alert("Invalid username or password");
                        }

                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting, values, setFieldValue }) => (
                        <Form className={styles.form}>
                            <Field className={styles.input} name="username" placeholder="Username" />
                            <ErrorMessage name="username" component="div" className={styles.error} />

                            <Field className={styles.input} name="password" placeholder="Password" type="password" />
                            <ErrorMessage name="password" component="div" className={styles.error} />

                            <div className={styles.remember}>
                                <input

                                    type="checkbox"
                                    id="rememberMe"
                                    checked={values.rememberMe}
                                    onChange={() => setFieldValue("rememberMe", !values.rememberMe)}
                                />
                                <label htmlFor="rememberMe">Remember me</label>
                            </div>

                            <button type="submit" className={styles.button} disabled={isSubmitting}>
                                {isSubmitting ? "Logging in..." : "Login"}
                            </button>
                        </Form>
                    )}
                </Formik>

                <p className={styles.registerText}>
                    Don’t have an account? <a href="/register" className={styles.registerLink}>Register here</a>
                </p>
            </div>
        </div>
    );
}
