import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Galaxy AI Ultimate",
  description: "Tu espacio inteligente para conversar, investigar y crear.",
  applicationName: "Galaxy AI Ultimate",
  manifest: "/manifest.webmanifest"
};

export const viewport: Viewport = {
  themeColor: "#080914",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
