"use client";

import { useEffect, useState } from "react";
import styles from "./CartPage.module.css";

export default function CartPage() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            const res = await fetch("https://fakestoreapi.com/products?limit=2");
            const data = await res.json();
            const itemsWithQty = data.map((item) => ({ ...item, quantity: 1 }));
            setCartItems(itemsWithQty);
        }
        fetchProducts();
    }, []);

    const updateQuantity = (id, newQty) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: newQty } : item
            )
        );
    };

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.title}>Shopping Cart</h1>

                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        <div className={styles.itemsList}>
                            {cartItems.map((item) => (
                                <div key={item.id} className={styles.item}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className={styles.image}
                                    />

                                    <span className={styles.name}>{item.title}</span>

                                    <select
                                        value={item.quantity}
                                        onChange={(e) =>
                                            updateQuantity(item.id, Number(e.target.value))
                                        }
                                        className={styles.select}
                                    >
                                        {[...Array(10)].map((_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1}
                                            </option>
                                        ))}
                                    </select>

                                    <span className={styles.price}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                                </div>
                            ))}
                        </div>

                        <div className={styles.totalContainer}>
                            <h2 className={styles.totalText}>
                                Total: <span>${total.toFixed(2)}</span>
                            </h2>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}