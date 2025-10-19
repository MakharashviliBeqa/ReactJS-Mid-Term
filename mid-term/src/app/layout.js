import { Geist, Geist_Mono } from "next/font/google";
import "./home/HomePage.module.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";

export const metadata = {
    title: "MyApp",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                backgroundColor: "white",
                margin: 0,
                fontFamily: "var(--font-geist-sans, sans-serif)",
            }}
        >
        <NavBar />
        <main
            style={{
                flex: 1,
                backgroundColor: "white",
            }}
        >
            {children}
        </main>
        <Footer />
        </body>
        </html>
    );
}