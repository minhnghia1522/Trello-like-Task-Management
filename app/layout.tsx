import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Task Management - Trello Clone",
  description: "A professional task management application built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
