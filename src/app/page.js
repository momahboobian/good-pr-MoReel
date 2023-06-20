import Image from "next/image";
import styles from "./page.module.css";
import TeamOverview from "./TeamOverview/TeamOverview";


export default function Home() {
  return (
    <div className="bg-[#070E0E]">
      <TeamOverview />
    </div>
  );
}
