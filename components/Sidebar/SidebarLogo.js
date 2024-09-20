import Logo from "@public/img/cyf.png";
import Image from "next/image";
import Link from "next/link";
// want to import the logo from the public folder

export default function SidebarLogo() {
	const logo = Logo;

<<<<<<< HEAD
  return (
    <Link href="/" className="flex flex-col items-center justify-center p-6">
      <Image key={logo} src={Logo} width={1000} height={1000} alt="cyf" className="w-28" priority />
    </Link>
  );
=======
	return (
		<Link href="/" className="flex flex-col items-center justify-center p-6">
			<Image
				key={logo}
				src={Logo}
				width={1000}
				height={1000}
				alt="cyf"
				className="w-28"
				priority
			/>
		</Link>
	);
>>>>>>> 60d7b2c6e096f957bb81572040c1c39291ead2f0
}
