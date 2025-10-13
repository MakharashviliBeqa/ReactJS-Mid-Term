"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useEffect } from "react";
import styles from "./LoginPage.module.css";

const schema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
    remember: yup.boolean(),
});

export default function LoginPage() {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { remember: false },
    });

    useEffect(() => {
        // Auto-login if token exists
        const savedToken = localStorage.getItem("token");
        if (savedToken) setToken(savedToken);
    }, []);

    const onSubmit = async (data) => {
        setLoading(true);
        setErrorMsg("");

        try {
            const res = await fetch("https://fakestoreapi.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: data.username,
                    password: data.password,
                }),
            });

            const result = await res.json();

            if (result.token) {
                setToken(result.token);
                if (data.remember) localStorage.setItem("token", result.token);
            } else {
                setErrorMsg("Invalid username or password.");
            }
        } catch {
            setErrorMsg("Something went wrong. Try again.");
        }

        setLoading(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    if (token) {
        return (
            <div className={styles.container}>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                    Logout
                </button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label>Username</label>
                    <input type="text" {...register("username")} />
                    {errors.username && <p className={styles.error}>{errors.username.message}</p>}
                </div>

                <div className={styles.inputGroup}>
                    <label>Password</label>
                    <input type="password" {...register("password")} />
                    {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                </div>

                <div className={styles.checkboxGroup}>
                    <input
                        type="checkbox"
                        id="remember"
                        {...register("remember")}
                        className={styles.checkboxInput}
                    />
                    <label htmlFor="remember" className={styles.checkboxLabel}>
                        Remember me
                    </label>
                </div>

                {errorMsg && <p className={styles.error}>{errorMsg}</p>}

                <button type="submit" disabled={loading} className={styles.loginBtn}>
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className={styles.registerText}>
                    Don’t have an account?{" "}
                    <a href="/register" className={styles.registerLink}>
                        Register here
                    </a>
                </p>
            </form>
        </div>
    );
}