"use client";

import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./RegisterPage.module.css";

const validationSchema = Yup.object({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    phone: Yup.string().required("Phone number is required"),
});

export default function RegisterPage() {
    const router = useRouter();

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h2 className={styles.title}>Create Account</h2>

                <Formik
                    initialValues={{
                        firstname: "",
                        lastname: "",
                        username: "",
                        email: "",
                        password: "",
                        phone: "",
                    }}

                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        // amas moaqvs informacia ukve arsebuli userebidan
                        const users = JSON.parse(localStorage.getItem("users")) || [];
                        // amatebs es axal userebs
                        users.push(values);
                        localStorage.setItem("users", JSON.stringify(users));

                        alert("Account created successfully!");
                        setSubmitting(false);
                        router.push("/profile");
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className={styles.form}>
                            <Field className={styles.input} name="firstname" placeholder="First Name" />
                            <ErrorMessage name="firstname" component="div" className={styles.error} />

                            <Field className={styles.input} name="lastname" placeholder="Last Name" />
                            <ErrorMessage name="lastname" component="div" className={styles.error} />

                            <Field className={styles.input} name="username" placeholder="Username" />
                            <ErrorMessage name="username" component="div" className={styles.error} />

                            <Field className={styles.input} name="email" placeholder="Email" type="email" />
                            <ErrorMessage name="email" component="div" className={styles.error} />

                            <Field className={styles.input} name="password" placeholder="Password" type="password" />
                            <ErrorMessage name="password" component="div" className={styles.error} />

                            <Field className={styles.input} name="phone" placeholder="Phone" />
                            <ErrorMessage name="phone" component="div" className={styles.error} />

                            <button type="submit" className={styles.button} disabled={isSubmitting}>
                                {isSubmitting ? "Registering..." : "Register"}
                            </button>
                        </Form>
                    )}
                </Formik>

                <p className={styles.registerText}>
                    Already have an account? <a href="/profile" className={styles.registerLink}>Login here</a>
                </p>
            </div>
        </div>
    );
}