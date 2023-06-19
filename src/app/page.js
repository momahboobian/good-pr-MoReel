import Image from "next/image";
import styles from "./page.module.css";
import TeamOverview from "./TeamOverview/TeamOverview";


export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <TeamOverview />
    </div>
  );
}
