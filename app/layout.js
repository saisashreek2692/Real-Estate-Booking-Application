import { Jost } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const jost = Jost({ subsets: ["latin"] });

export const metadata = {
  title: "Real Estate Booking Application",
  description:
    "Sell, Rent, Book your House by creating an account and manage your Listings",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={jost.className}>
          <Provider>
            {children}
            <Toaster />
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
