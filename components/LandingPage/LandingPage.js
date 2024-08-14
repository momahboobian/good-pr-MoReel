import Image from "next/image";
import Hero from "@public/img/app.png";
import Logo from "@public/img/logo.png";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col sm:flex-row items-center justify-center mt-8 sm:mt-0">
      <section className="flex flex-col items-center justify-center w-full sm:w-1/2 gap-6 px-6 sm:px-8">
        <Image
          src={Logo}
          alt="CYF Logo"
          width={200}
          height={200}
          className="mb-8"
        />
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-center text-white">
          Which cohort are you from?
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            href="/wm5"
            passHref
            className="bg-[#37BCBA] hover:bg-[#1a9997] text-gray-900 font-bold text-xl py-4 px-12 rounded-lg"
          >
            WM5
          </Link>
          <Link
            href="/nw6"
            passHref
            className="bg-[#37BCBA] hover:bg-[#1a9997] text-gray-900 font-bold text-xl py-4 px-12 rounded-lg"
          >
            NW6
          </Link>
        </div>
      </section>
      <section className="relative w-full sm:w-1/2 flex items-center justify-center mt-16 sm:mt-24 ">
        <Image
          src={Hero}
          alt="App Screenshot"
          width={500}
          height={500}
          className="object-contain rounded-t-xl mt-8"
        />
      </section>
    </main>
  );
}
