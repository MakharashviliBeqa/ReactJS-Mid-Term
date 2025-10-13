"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function loginUser(username, password) {
        const res = await fetch("https://fakestoreapi.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        if (!res.ok) throw new Error("Login failed");
        return res.json();
    }

    async function fetchUserData() {
        const res = await fetch("https://fakestoreapi.com/users/3");
        const data = await res.json();
        return data;
    }

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await loginUser(username, password);

            if (data.token) {
                const userData = await fetchUserData();
                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));
            }
        } catch {
            setError("Invalid username or password");
        }
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <div className={styles.page}>
            {!user ? (
                <form onSubmit={handleLogin} className={styles.card}>
                    <h2 style={{ color: "black" }}>Login</h2>

                    <input
                        type="text"
                        placeholder="Username"
                        className={styles.input}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className={styles.error}>{error}</p>}

                    <button type="submit" className={styles.button}>
                        Login
                    </button>
                </form>
            ) : (
                <div className={styles.card}>
                    <Image
                        src="/cute-cat.jpg"
                        alt="User Avatar"
                        width={120}
                        height={120}
                        className={styles.avatar}
                    />
                    <div className={styles.userInfo}>
                        <h3 className={styles.userText}>
                            {user.name.firstname} {user.name.lastname}
                        </h3>
                        <p className={styles.userText}>
                            <strong>Email:</strong> {user.email}
                        </p>
                        <p className={styles.userText}>
                            <strong>Phone:</strong> {user.phone}
                        </p>
                    </div>

                    <button onClick={handleLogout} className={styles.logoutBtn}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
