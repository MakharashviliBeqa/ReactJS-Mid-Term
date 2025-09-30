import React from "react";
import Image from "next/image";

async function getUser() {
    const res = await fetch("https://fakestoreapi.com/users/3");
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
}

export default async function ProfilePage() {
    const user = await getUser();

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="flex items-center gap-6 bg-white p-6 rounded shadow-lg max-w-2xl">
                <Image
                    src="/cute-cat.jpg"
                    alt="User Avatar"
                    width={300}
                    height={300}
                    className="rounded-full object-cover"
                />

                <div className="flex flex-col justify-center">
                    <h1 className="text-2xl font-bold mb-2">
                        {user.name.firstname} {user.name.lastname}
                    </h1>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p>
                        <strong>Address:</strong> {user.address.number} {user.address.street},{" "}
                        {user.address.city}, {user.address.zipcode}
                    </p>
                </div>
            </div>
        </div>
    );
}
