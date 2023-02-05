import React, { useEffect, useState } from "react";
import Mix from "./Mix";
import { IPlaylistItems } from "./interfaces/apiInterfaces";
import { getCategoryPlaylists } from "../api/getCategory";

interface IMixesBlock {
  name: string;
  categoryID: string;
}

function MixesBlock({ name, categoryID }: IMixesBlock) {
  const token = window.localStorage.getItem("token");
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    async function foo() {
      setPlaylists(await getCategoryPlaylists(token, categoryID));
    }
    foo();
  }, []);

  console.log(playlists);

  return (
    <div className="mixes-block">
      <div className="mixes-block-header">
        <p className="mixes-block-header-title">{name}</p>
        <p className="mixes-block-header-show">show all</p>
      </div>
      <div className="mixes">
        {playlists.length > 0
          ? playlists.map((playlist: IPlaylistItems) => (
              <Mix
                key={playlist.name}
                image={playlist.images[0].url}
                name={playlist.name}
                description={playlist.description}
              />
            ))
          : ""}
      </div>
    </div>
  );
}

export default MixesBlock;
