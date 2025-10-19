"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./productcard.module.css";

export default function ProductCard({ product }) {
    const [added, setAdded] = useState(false);

    const handleAdd = (e) => {
        e.preventDefault();
        e.stopPropagation(); // prevent navigation
        setAdded(true);

        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const found = cart.find((p) => p.id === product.id);
        if (found) {
            found.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    };

    return (
        <div className={styles.card}>
            {/* Make this container relative so button can be absolute */}
            <Link href={`/product/${product.id}`} className={styles.linkArea}>
                <Image
                    src={product.image}
                    alt={product.title}
                    width={150}
                    height={150}
                    className={styles.image}
                />
                <h2 className={styles.title}>{product.title}</h2>
                <p className={styles.rating}>
                    ⭐ {product.rating.rate} ({product.rating.count} reviews)
                </p>
                <p className={styles.price}>${product.price}</p>
            </Link>

            {/* Button is outside Link but positioned over card */}
            <button className={styles.addBtn} onClick={handleAdd}>
                {added ? "✔" : "+"}
            </button>
        </div>
    );
}