import React, { useEffect, useState } from "react";
import MixesBlock from "../components/MixesBlock";
import SettingsBar from "../components/SettingsBar";
import axios from "axios";

interface ICategories {
  name: string;
}

function HomePage() {
  const [currentToken, setCurrentToken] = useState<string>("");
  const [categories, setCategories] = useState<ICategories[]>([]);

  const addCategories = async () => {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/browse/categories",
      {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      }
    );
    console.log(data.categories.items);
    setCategories(data.categories.items);
  };

  useEffect(() => {
    addCategories();
  }, []);

  // const blockName = [
  //   "Today's biggest hits",
  //   "Featured Charts",
  //   "Workout",
  //   "Fresh new music",
  //   "Mood",
  // ];

  return (
    <div className="home-page">
      <SettingsBar setCurrentToken={setCurrentToken} />
      <div className="mixes-block-wrapper">
        {categories.map((item) => (
          <MixesBlock name={item.name} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
