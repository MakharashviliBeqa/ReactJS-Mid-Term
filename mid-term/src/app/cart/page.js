"use client";

import { useEffect, useState } from "react";

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

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "white",
                padding: "40px 20px",
                boxSizing: "border-box",
                color: "black",
            }}
        >
            <div
                style={{
                    maxWidth: "800px",
                    margin: "0 auto",
                    backgroundColor: "white",
                }}
            >
                <h1
                    style={{
                        fontSize: "50px",
                        fontWeight: "bold",
                        marginBottom: "24px",
                    }}
                >
                    Shopping Cart
                </h1>

                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "12px 16px",
                                    backgroundColor: "white",
                                    color: "black",
                                }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{ width: "150px", height: "150px", objectFit: "contain" }}
                                />

                                <span
                                    style={{
                                        flex: 1,
                                        marginLeft: "16px",
                                        fontWeight: "600",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                  {item.title}
                </span>

                                <select
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                                    style={{
                                        border: "1px solid #ccc",
                                        borderRadius: "4px",
                                        padding: "4px 8px",
                                        margin: "0 16px",
                                        color: "black",
                                        backgroundColor: "white",
                                    }}
                                >
                                    {[...Array(10)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    ))}
                                </select>

                                <span style={{ fontWeight: "600" }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
