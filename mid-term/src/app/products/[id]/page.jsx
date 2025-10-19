"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProductPage.module.css";

export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await fetch(`https://fakestoreapi.com/products/${id}`);
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                console.error("Failed to fetch product:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    if (loading) return <p className={styles.loading}>Loading product...</p>;
    if (!product) return <p className={styles.error}>Product not found.</p>;

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <Image
                    src={product.image}
                    alt={product.title}
                    width={250}
                    height={250}
                    className={styles.image}
                />

                <div className={styles.details}>
                    <h1 className={styles.title}>{product.title}</h1>
                    <p className={styles.category}>Category: {product.category}</p>
                    <p className={styles.description}>{product.description}</p>
                    <p className={styles.rating}>
                        ⭐ {product.rating.rate} ({product.rating.count} reviews)
                    </p>
                    <p className={styles.price}>${product.price}</p>

                    <Link href="/" className={styles.backButton}>
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
