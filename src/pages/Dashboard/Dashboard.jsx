import React, { useCallback, useState } from "react";
import Slider from "../../components/Slider/Slider";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const onSearchQueryChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);
  return (
    <div className="container">
      <form action="#">
        <input type="text" value={searchQuery} onChange={onSearchQueryChange} />
        <button>Search</button>
      </form>
      <Slider />
    </div>
  );
};

export default Dashboard;
