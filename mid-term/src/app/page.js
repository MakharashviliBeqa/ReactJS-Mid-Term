import Image from "next/image";

async function getProducts() {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
}

export default async function HomePage() {
    const products = await getProducts();

    return (
        <div style={{ padding: "20px", margin: "0 auto", backgroundColor: "#fbfafa" }}>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", marginTop: "30px" }}>
                {products.map((product) => (
                    <div
                        key={product.id}
                        style={{
                            padding: "15px",
                            width: "200px",
                            textAlign: "left",
                            backgroundColor: "#f2f2f2",
                            color: "black",
                        }}
                    >
                        <Image
                            src={product.image}
                            alt={product.title}
                            width={150}
                            height={150}
                            style={{ objectFit: "contain", marginBottom: "10px" }}
                        />
                        <h2 style={{ fontSize: "15px", marginBottom: "5px" }}>{product.title}</h2>
                        <p style={{ fontWeight: "bold", fontSize: "25"}}>${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

