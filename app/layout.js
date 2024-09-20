import "@styles/globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";
import Sidebar from "@components/Sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "The Good PR",
	description:
		"Track you GitHub Pull Request, projects, tasks & team activity here",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<Head>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<body className={inter.className}>
				<main className="lg:bg-zinc-900 xl:p-2">
					<div className="flex flex-col xl:flex-row xl:rounded-xl overflow-hidden xl:overflow-x-auto border-gray-950">
						<div>
							<Sidebar />
						</div>
						{children}
					</div>
				</main>
			</body>
		</html>
	);
}
