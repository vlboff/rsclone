import React, { useEffect, useState } from "react";
import { IAlbum } from "../components/interfaces/apiInterfaces";
import { IconPreloader } from "../icons";
import { getAlbum } from "../api/getAlbum";
import SongAlbumPlaylistPageHeader from "../components/SongAlbumPlaylistPageHeader";

interface IAlbumPage {
  albumID: string;
  randomColor: string;
  setHeaderName: React.Dispatch<React.SetStateAction<string>>;
}

function AlbumPage({ albumID, randomColor, setHeaderName }: IAlbumPage) {
  const token = window.localStorage.getItem("token");
  const [album, setAlbum] = useState<IAlbum | null>(null);

  console.log(album);

  useEffect(() => {
    if (albumID.length > 0) {
      const foo = async () => {
        setAlbum(await getAlbum(token, albumID));
      };
      foo();
    }
  }, [setAlbum]);

  useEffect(() => {
    setHeaderName(album ? album.name : "");
  }, [album]);

  return album ? (
    <div className="album-page">
      <SongAlbumPlaylistPageHeader
        color={randomColor}
        image={album.images[0].url}
        title={"album"}
        name={album.name}
        age={album.release_date.slice(0, 4)}
        owner={album.artists[0].name}
        tracks={album.tracks.total}
        duration={album.tracks.items.reduce(
          (sum, current) => sum + current.duration_ms,
          0
        )}
      />
    </div>
  ) : (
    <div>
      <IconPreloader width={50} height={50} />
    </div>
  );
}

export default AlbumPage;
