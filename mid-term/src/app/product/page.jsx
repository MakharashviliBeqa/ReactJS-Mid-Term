"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./HomePage.module.css";

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch("https://fakestoreapi.com/products");
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.error("Failed to fetch products:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    if (loading) return <p className={styles.loading}>Loading...</p>;

    return (
        <div className={styles.container}>
            <div className={styles.productsGrid}>
                {products.map((product) => (
                    <Link
                        href={`/products/${product.id}`}
                        key={product.id}
                        className={styles.cardLink}
                    >
                        <div className={styles.card}>
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
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
