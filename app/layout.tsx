import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Saras Ugale | AI/ML Engineer",
  description:
    "Portfolio of Saras Ugale — AI/ML Engineer specializing in Computer Vision, Healthcare NLP, and Generative AI. Graduating July 2026, open to opportunities.",
  openGraph: {
    title: "Saras Ugale | AI/ML Engineer",
    description: "Building production intelligent systems with PyTorch, NLP & Computer Vision.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
