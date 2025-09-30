"use client";

import Link from "next/link";

export default function NavBar() {
    const menuItems = [
        { name: "Home", href: "/" },
        { name: "Cart", href: "/cart" },
        { name: "Account", href: "/profile" },
    ];

    return (
        <nav style={{ backgroundColor: "white", padding: "15px 0", width: "100%" }}>
            <ul style={{ display: "flex", justifyContent: "center", listStyle: "none", margin: 0, padding: 0, gap: "40px" }}>
                {menuItems.map(item => (
                    <li key={item.name} style={{ whiteSpace: "nowrap" }}>
                        <Link
                            href={item.href}
                            style={{ color: "black", fontWeight: "bold", textDecoration: "none"  }}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
