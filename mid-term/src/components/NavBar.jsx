"use client";
import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="text-xl font-bold">MyApp</div>
            <ul className="flex space-x-6">
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="#">Dashboards</Link>
                </li>
                <li>
                    <Link href="#">Cart</Link>
                </li>
                <li>
                    <Link href="/profile">Account</Link>
                </li>
                <li>
                    <Link href="#">Settings</Link>
                </li>
            </ul>
        </nav>
    );
}

