import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import ProtectedRoute from "./(site)/components/ProtectedRoute";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Messenger App",
  description:
    "A simple messenger application built with Next.js and TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProtectedRoute>{children}</ProtectedRoute>
        <Toaster />
      </body>
    </html>
  );
}
