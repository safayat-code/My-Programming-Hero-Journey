"use client";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import DataProvider from "./DataProvider";
import Navbar from "./Navbar";
import Ticker from "./Ticker";
import Footer from "./Footer";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <DataProvider>
      <Toaster position="top-center" toastOptions={{ style: { fontFamily: "inherit" } }} />
      <Navbar />
      <Ticker />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
    </DataProvider>
  );
}
