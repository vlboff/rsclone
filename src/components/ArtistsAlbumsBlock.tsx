import React, { useEffect, useState } from "react";
import { IResponseAlbum } from "./interfaces/apiInterfaces";
import Mix from "./Mix";

interface AlbumsBlock {
  albums?: IResponseAlbum[];
  albumID: string;
  setAlbumID: React.Dispatch<React.SetStateAction<string>>;
  artistID: string;
  artistName: string;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
}

function ArtistsAlbumsBlock({
  albums,
  albumID,
  setAlbumID,
  artistID,
  artistName,
  setRandomColor,
}: AlbumsBlock) {
  return (
    <div className="mixes-block">
      <div className="mixes-block-header">
        <p className="mixes-block-header-title">
          {albums ? albums[0].album_type : ""} by {artistName}
        </p>
      </div>
      <div className="mixes">
        {albums?.map((item) => (
          <Mix
            key={`${item.name}${Math.random()}`}
            image={item.images[0].url}
            name={item.name}
            description={`${item.release_date.slice(0, 4)} • ${
              item.album_type
            }`}
            setRandomColor={setRandomColor}
          />
        ))}
      </div>
    </div>
  );
}

export default ArtistsAlbumsBlock;
