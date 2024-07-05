import Image from "next/image";
import Hero from "@public/img/app.png";
import Logo from "@public/img/logo.png";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col sm:flex-row mt-8">
      <section className="w-full flex flex-col items-center justify-items-center gap-6 px-4 lg:px-8">
        <Image
          src={Logo}
          alt="CYF Logo"
          width={200}
          height={200}
          className="mt-8 mb-8"
        />
        <h1 className="text-5xl font-bold mb-4 text-center text-white mt-4">
          Which cohort are you from?
        </h1>
        <div className="flex flex-row md:flex-col gap-4 mt-8">
          <Link
            href="/wm5"
            passHref
            className="bg-[#37BCBA] hover:bg-[#1a9997] text-gray-900 font-bold text-xl py-4 px-12 rounded-lg mb-2"
          >
            WM5
          </Link>
          <Link
            href="/nw6"
            passHref
            className="bg-[#37BCBA] hover:bg-[#1a9997] text-gray-900 font-bold text-xl py-4 px-12 rounded-lg mb-2"
          >
            NW6
          </Link>
        </div>
      </section>
      <section className="relative self-end">
        <Image
          src={Hero}
          alt="App Screenshot"
          width={600}
          height={600}
          className="rounded-t-xl object-cover mt-4 md:bottom-0 right-0"
        />
      </section>
    </main>
  );
}
