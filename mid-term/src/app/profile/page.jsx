"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        // es amowmebs ari tu ara useri shesuli ukve
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser) {
            setUser(loggedInUser);
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const matchedUser = users.find(
            (u) => u.username === username && u.password === password
        );

        if (matchedUser) {
            setUser(matchedUser);

            if (rememberMe) {
                localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
            }

            setUsername("");
            setPassword("");
        } else {
            setError("Invalid username or password");
        }
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("loggedInUser");
    };

    return (
        <div className={styles.page}>
            {!user ? (
                <form onSubmit={handleLogin} className={styles.card}>
                    <h2 className={styles.title}>Login</h2>

                    <input
                        type="text"
                        placeholder="Username"
                        className={styles.input}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div className={styles.remember}>
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label htmlFor="rememberMe">Remember me</label>
                    </div>

                    {error && <p className={styles.error}>{error}</p>}

                    <button type="submit" className={styles.button}>
                        Login
                    </button>

                    <p className={styles.registerText}>
                        Don’t have an account? <a href="/register">Register here</a>
                    </p>
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
                            {user.firstname} {user.lastname}
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