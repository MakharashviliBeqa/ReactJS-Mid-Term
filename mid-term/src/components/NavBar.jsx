"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const pathname = usePathname(); // get current route

    const menuItems = [
        { name: "Home", href: "/" },
        { name: "Cart", href: "/cart" },
        { name: "Account", href: "/profile" },
    ];

    return (
        <nav style={{ backgroundColor: "white", padding: "15px 0", width: "100%" }}>
            <ul
                style={{
                    display: "flex",
                    justifyContent: "center",
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    gap: "40px",
                }}
            >
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <li key={item.name} style={{ whiteSpace: "nowrap", position: "relative" }}>
                            <Link
                                href={item.href}
                                style={{
                                    color: "black",
                                    fontWeight: "bold",
                                    textDecoration: "none",
                                    paddingBottom: "4px",
                                }}
                            >
                                {item.name}
                                <span
                                    style={{
                                        position: "absolute",
                                        left: 0,
                                        bottom: 0,
                                        height: "2px",
                                        width: isActive ? "100%" : "0",
                                        backgroundColor: "black",
                                        transition: "width 0.3s",
                                    }}
                                />
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
