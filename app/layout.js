import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({ subsets: ["latin"] });

export const metadata = {
  title: "Real Estate Booking Application",
  description: "Sell, Rent, Book your House by creating an account and manage your Listings",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jost.className}>{children}</body>
    </html>
  );
}
