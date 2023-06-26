// "use client";
// import React, { useEffect, useState } from "react";

const Home = () => {
  // const [team, setTeam] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch("/api/gitHubAPI");
  //     const data = await response.json();
  //     setTeam(data);
  //   };

  //   fetchData();
  // }, []);

  // console.log(team);
  return (
    <main className="flex min-h-screen justify-between p-0">
      <div className="">This is from page</div>
      {/* {team.map((el) => (
        <div>
          <span>{el.login}</span>
          <span>{el.type}</span>
        </div>
      ))} */}
    </main>
  );
};
export default Home;
