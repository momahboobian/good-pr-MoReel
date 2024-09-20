import Logo from "@public/img/cyf.png";
import Image from "next/image";
import Link from "next/link";
// want to import the logo from the public folder

export default function SidebarLogo() {
  const logo = Logo;

  return (
    <Link href="/" className="flex flex-col items-center justify-center p-6">
      <Image key={logo} src={Logo} width={1000} height={1000} alt="cyf" className="w-28" priority />
    </Link>
  );
}
