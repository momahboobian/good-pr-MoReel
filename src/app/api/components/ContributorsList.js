import React, { useEffect, useState } from "react";
import jsonData from "../../../../g1-e-commerce.json";

const ContributorList = () => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    console.log("jsonData.contributors:", jsonData.contributors);
    setContributors(jsonData.contributors);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center p-6">
      <h1>Number of Contributors: {contributors.length}</h1>
      <ul className="flex flex-row">
        {contributors.map((contributor) => (
          <li key={contributor.id} className="flex flex-col items-center p-6">
            <img
              src={contributor.avatar_url}
              alt={contributor.login}
              className="w-20 h-20 rounded-full border-2 border-neutral-200 object-cover mr-2"
            />
            <span>{contributor.login}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContributorList;
