import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Header } from '@/widgets/Header'
import { Providers } from '@/components/Providers/Providers'
const inter = Inter({ subsets: ["latin"] });

import "./globals.css"
import { Footer } from '@/widgets/Footer'

export const metadata: Metadata = {
  title: "Social",
  description: "Social, next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
      <body className={inter.className}>
        <header>
          <Header />
        </header>
        <main>
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
      </body>
      </Providers>
    </html>
  );
}
