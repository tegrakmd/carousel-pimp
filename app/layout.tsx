
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





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en" suppressHydrationWarning
      className={cn("h-full", "antialiased", GeistPixelCircle.variable,GeistPixelSquare.variable, GeistPixelGrid.variable, GeistPixelCircle.variable, GeistPixelTriangle.variable, GeistPixelLine.variable, "font-sans", )}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
