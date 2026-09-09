import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ColorContextProvider from "./context/ColorContext";
import { useContext } from "react";
import { ColorContext } from "./context/ColorContext";
import Task from "./component/Task";
import AuthProvider from "./context/AuthContext";
import { cookies } from 'next/headers';
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {/* <AuthProvider> */}

        {children}
        {/* <ColorContextProvider>
            <ThemeWrapper>
            </ThemeWrapper>
          </ColorContextProvider> */}
        {/* </AuthProvider> */}

        <Toaster position="top-right" />
      </body>
    </html>
  );
}

// function ThemeWrapper({ children }) {
//   const { bgColor, txtColor } = useContext(ColorContext);
//   return (
//     <main className={`w-full max-w-[1400px] mx-auto  my-12 ${bgColor} ${txtColor} sm:items-start`}>
//       <Navbar />
//       <Task />
//       {children}
//     </main>
//   );
// }
