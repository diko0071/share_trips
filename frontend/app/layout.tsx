import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { MenuBar } from "./components/menu-bar/menu-bar";
import { PopupProvider } from "./components/user/popup-context";
import { LoginForm } from "./components/user/login-popup";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb Sharing",
  description: "Airbnb Sharing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (  
    <html lang="en">
      <body className={`${inter.className}`}>
      <PopupProvider>
        <MenuBar />
        <main className="mt-8 grid w-full h-full px-4 md:px-6 py-5">
            {children}           
        <Toaster />
       </main>
       <LoginForm />
       </PopupProvider>
      </body>
    </html>
  );
}