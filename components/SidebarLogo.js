import Link from "next/link";
import Image from "next/image";
// want to import the logo from the public folder
import Logo from "@public/img/cyf.png";

export default function SidebarLogo() {
  const logo = Logo;

  return (
    <Link href="/" className="flex flex-col items-center justify-center p-6">
      <Image
        key={logo}
        src={Logo}
        width={2000}
        height={2000}
        alt="cyf"
        className="w-28 "
      />
    </Link>
  );
}
