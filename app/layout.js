import "@styles/globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "The Good PR",
  description:
    "Track your GitHub Pull Requests, projects, tasks, and team activity here",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={`${inter.className} h-full`}>{children}</body>
    </html>
  );
}
