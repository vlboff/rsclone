import React, { useEffect, useState } from "react";
import { IAlbum, IArtistsTopTrecks } from "../components/interfaces/apiInterfaces";
import { IconPreloader, IconClock } from "../icons";
import { getAlbum } from "../api/getAlbum";
import SongAlbumPlaylistPageHeader from "../components/SongAlbumPlaylistPageHeader";
import PageControlPanel from "../components/PageControlPanel";
import TracklistRow from "../components/TracklistRow";
import { getCopyrightsDate } from "../utils/utils";

interface IAlbumPage {
  albumID: string;
  randomColor: string;
  setTrackID: React.Dispatch<React.SetStateAction<string>>;
  setHeaderName: React.Dispatch<React.SetStateAction<string>>;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
}

export let currentAlbumTracks: IAlbum;

function AlbumPage({
  albumID,
  randomColor,
  setTrackID,
  setHeaderName,
  setRandomColor,
}: IAlbumPage) {
  const token = window.localStorage.getItem("token");
  const [album, setAlbum] = useState<IAlbum | null>(null);
  const audio = document.querySelector(".playback") as HTMLAudioElement;
  if (album ) {
    currentAlbumTracks = album;
  }

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
        durationTotal={album.tracks.items.reduce(
          (sum, current) => sum + current.duration_ms,
          0
        )}
      />
      <div className="tracklist-table">
        <PageControlPanel color={randomColor} setIconHeart={false} />
        <div className="tracklist-table_title">
          <div className="title-number">#</div>
          <div className="title-info">title</div>
          <div className="title-album"></div>
          <div className="title-date"></div>
          <div className="title-time">
            <IconClock fill="#b3b3b3" />
          </div>
        </div>
        <div className="line"></div>
        {album.tracks.items.length > 0 ? (
          album.tracks.items.map((item) => (
            <TracklistRow
              key={`${item.name}${Math.random()}`}
              number={item.track_number}
              name={item.name}
              trackID={item.id}
              setTrackID={setTrackID}
              artist={item.artists[0].name}
              artistID={item.artists[0].id}
              duration={item.duration_ms}
              setRandomColor={setRandomColor}
              isPlaying={item.id === audio.dataset.track_id ? true : false}
            />
          ))
        ) : (
          <p className="no-tracks_ad">Sorry... No trial version of tracks</p>
        )}
        <div className="copyrights">
          <div className="copyrights-date">
            {getCopyrightsDate(album.release_date)}
          </div>
          <div className="copyrights-text">
            {" "}
            &#169;{album.copyrights.length ? album.copyrights[0].text : ""}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <IconPreloader width={50} height={50} />
    </div>
  );
}

export default AlbumPage;
