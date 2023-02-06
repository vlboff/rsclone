import { url } from "inspector";
import React, { useEffect, useState } from "react";
import { getPlaylists } from "../api/getPlaylist";
import { IPlaylist } from "../components/interfaces/apiInterfaces";

interface IPlaylistPage {
  playlistID: string;
}

function PlaylistPage({ playlistID }: IPlaylistPage) {
  const token = window.localStorage.getItem("token");
  const [playlist, setPlaylists] = useState<IPlaylist | null>(null);

  useEffect(() => {
    if (playlistID.length > 0) {
      const foo = async () => {
        setPlaylists(await getPlaylists(token, playlistID));
      };
      foo();
    }
  }, [setPlaylists]);

  console.log(playlist);

  return (
    <div className="playlist-page">
      <div
        className="playlist-header"
        style={
          playlist
            ? {
                background: `no-repeat center/cover url("${playlist.images[0].url}")`,
              }
            : { background: "none" }
        }
      >
        playlist
      </div>
      <div className="playlist-main"></div>
    </div>
  );
}

export default PlaylistPage;
