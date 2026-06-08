import { Geist, Geist_Mono, Inter } from "next/font/google";
import {
  GeistPixelSquare,
  GeistPixelGrid,
  GeistPixelCircle,
  GeistPixelTriangle,
  GeistPixelLine,
} from "geist/font/pixel";
import "./globals.css";
import { cn } from "@/lib/utils";
import { constructMetaData } from "@/lib/Metadata";

export const metadata = constructMetaData();

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en" suppressHydrationWarning
      className={cn("h-full", "antialiased", GeistPixelCircle.variable,geistSans.variable, geistMono.variable,GeistPixelSquare.variable, GeistPixelGrid.variable, GeistPixelCircle.variable, GeistPixelTriangle.variable, GeistPixelLine.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
