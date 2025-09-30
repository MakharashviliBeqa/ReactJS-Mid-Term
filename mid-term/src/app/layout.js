import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export const metadata = {
    title: "MyApp",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
        <Footer />
        </body>
        </html>
    );
}
