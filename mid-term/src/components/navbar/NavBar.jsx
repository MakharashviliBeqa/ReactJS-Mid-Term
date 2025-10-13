"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavBar.module.css";

export default function NavBar() {
    const pathname = usePathname(); // get current route

    const menuItems = [
        { name: "Home", href: "/" },
        { name: "Cart", href: "/cart" },
        { name: "Account", href: "/profile" },
    ];

    return (
        <nav className={styles.nav}>
            <ul className={styles.menu}>
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <li key={item.name} className={styles.menuItem}>
                            <Link href={item.href} className={styles.link}>
                                {item.name}
                                <span
                                    className={styles.underline}
                                    style={{ width: isActive ? "100%" : "0" }}
                                />
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}