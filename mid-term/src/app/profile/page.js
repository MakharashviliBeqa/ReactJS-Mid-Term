// app/profile/page.js
import React from "react";

async function getUser() {
    const res = await fetch("https://fakestoreapi.com/users/3");
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
}

export default async function ProfilePage() {
    const user = await getUser();

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <p>
                <strong>Name:</strong> {user.name.firstname} {user.name.lastname}
            </p>
            <p>
                <strong>Username:</strong> {user.username}
            </p>
            <p>
                <strong>Email:</strong> {user.email}
            </p>
            <p>
                <strong>Phone:</strong> {user.phone}
            </p>
            <p>
                <strong>Address:</strong> {user.address.number} {user.address.street},{" "}
                {user.address.city}, {user.address.zipcode}
            </p>
        </div>
    );
}
