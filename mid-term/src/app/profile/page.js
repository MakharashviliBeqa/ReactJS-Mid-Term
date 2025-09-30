import Image from "next/image";

async function getUser() {
    const res = await fetch("https://fakestoreapi.com/users/3");
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
}

export default async function ProfilePage() {
    const user = await getUser();

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "87vh",
                backgroundColor: "#fbfafa",
            }}
        >
            <div
                style={{
                    padding: "20px",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    maxWidth: "672px",
                }}
            >
                <Image
                    src="/cute-cat.jpg"
                    alt="User Avatar"
                    width={300}
                    height={300}
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                />

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px", color: "black" }}>
                        {user.name.firstname} {user.name.lastname}
                    </h1>
                    <p style={{ color: "black" }}>
                        <strong>Email:</strong> {user.email}
                    </p>

                    <p style={{ color: "black" }}>
                        <strong>Phone:</strong> {user.phone}
                    </p>

                    <p style={{ color: "black" }}>
                        <strong>Address:</strong> {user.address.number} {user.address.street}, {user.address.city}, {user.address.zipcode}
                    </p>
                </div>
            </div>
        </div>
    );
}
