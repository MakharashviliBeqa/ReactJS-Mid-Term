import Image from "next/image";
import Link from "next/link";
import styles from "./HomePage.module.css";

async function getProducts() {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
}

export default async function HomePage() {
    const products = await getProducts();

    return (
        <div className={styles.container}>
            <div className={styles.productsGrid}>
                {products.map((product) => (
                    <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        className={styles.card}
                    >
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
                ))}
            </div>
        </div>
    );
}
