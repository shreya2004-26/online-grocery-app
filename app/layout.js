"use client"
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner";
import { UpdateCartContext } from "./_context/UpdateCartContext";
import { useState } from "react";
import { metadata } from './metadata';  // Adjust the import path as necessary
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [updateCart, setUpdateCart] = useState(false);
  return (
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
      <html lang="en">
        <title>GroceryMart</title>
        <body className={outfit.className} suppressHydrationWarning={true}>
          <UpdateCartContext.Provider value={{ updateCart, setUpdateCart }}>
            {children} <Toaster />
          </UpdateCartContext.Provider>
        </body>
      </html>
    </PayPalScriptProvider>
  );
}
