"use client";

import { useState, useEffect } from "react";
import ProductCard from "../../components/productcard/page";
import styles from "../home/HomePage.module.css";

export default function HomePage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then(setProducts)
            .catch(console.error);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.productsGrid}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
