"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./RegisterPage.module.css";

export default function RegisterPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        email: "",
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        phone: "",
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            // inaxavs userebs localurad
            const users = JSON.parse(localStorage.getItem("users")) || [];

            const newUser = { ...form };
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            setMessage(" Account created successfully!");
            setTimeout(() => router.push("/profile"), 1500);
        } catch (err) {
            console.error(err);
            setMessage(" Error creating account. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <form className={styles.card} onSubmit={handleRegister}>
                <h2 className={styles.title}>Create Account</h2>

                <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    value={form.firstname}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />

                <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={form.lastname}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />

                {message && <p className={styles.message}>{message}</p>}

                <button type="submit" className={styles.button} disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>

                <p className={styles.loginText}>
                    Already have an account?{" "}
                    <a href="/profile" className={styles.link}>
                        Login
                    </a>
                </p>
            </form>
        </div>
    );
}