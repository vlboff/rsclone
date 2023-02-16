import React, { useEffect, useState } from "react";
import { getPlaylists } from "../api/getPlaylist";
import { IPlaylist } from "../components/interfaces/apiInterfaces";
import extractColors from "extract-colors";
import { IconClock, IconPreloader } from "../icons";
import TracklistRow from "../components/TracklistRow";
import { getSeparateByCommas } from "../utils/utils";
import SongAlbumPlaylistPageHeader from "../components/SongAlbumPlaylistPageHeader";
import PageControlPanel from "../components/PageControlPanel";

interface IPlaylistPage {
  playlistID: string;
  randomColor: string;
  setHeaderName: React.Dispatch<React.SetStateAction<string>>;
  setTrackID: React.Dispatch<React.SetStateAction<string>>;
  setAlbumID: React.Dispatch<React.SetStateAction<string>>;
  setArtistID: React.Dispatch<React.SetStateAction<string>>;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
}

export let currentPlaylist: IPlaylist;

function PlaylistPage({
  playlistID,
  randomColor,
  setHeaderName,
  setTrackID,
  setAlbumID,
  setArtistID,
  setRandomColor,
}: IPlaylistPage) {
  const token = window.localStorage.getItem("token");
  const [playlist, setPlaylists] = useState<IPlaylist | null>(null);
  const audio = document.querySelector('.playback') as HTMLAudioElement;
  if (playlist) {
    currentPlaylist = playlist;
  }

  useEffect(() => {
    if (playlistID.length > 0) {
      const foo = async () => {
        setPlaylists(await getPlaylists(token, playlistID));
      };
      foo();
    }
  }, [setPlaylists]);

  useEffect(() => {
    setHeaderName(playlist ? playlist.name : "");
  }, [playlist]);

  // extractColors(
  //   document.querySelector(".playlist-header_cover") as HTMLImageElement
  // )
  //   .then(console.log)
  //   .catch(console.error);

  const followers =
    String(playlist?.followers.total).length > 3
      ? getSeparateByCommas(String(playlist?.followers.total))
      : playlist?.followers.total;

  return playlist ? (
    <div className="playlist-page">
      <SongAlbumPlaylistPageHeader
        color={randomColor}
        image={playlist.images[0].url}
        title={"playlist"}
        name={playlist.name}
        description={playlist.description}
        owner={playlist.owner.display_name}
        followers={followers}
        tracks={playlist.tracks.total}
      />

      <div className="tracklist-table">
        <PageControlPanel color={randomColor} setIconHeart={false} />
        <div className="tracklist-table_title">
          <div className="title-number">#</div>
          <div className="title-info">title</div>
          <div className="title-album">album</div>
          <div className="title-date">date added</div>
          <div className="title-time">
            <IconClock fill="#b3b3b3" />
          </div>
        </div>
        <div className="line"></div>
        {playlist?.tracks.items.map((item, index) => (
          <TracklistRow
            key={`${item.track.name}${Math.random()}`}
            number={index + 1}
            image={item.track.album.images[0].url}
            name={item.track.name}
            trackID={item.track.id}
            setTrackID={setTrackID}
            artist={item.track.artists[0].name}
            artistID={item.track.artists[0].id}
            setArtistID={setArtistID}
            album={item.track.album.name}
            albumID={item.track.album.id}
            setAlbumID={setAlbumID}
            data={item.added_at}
            duration={item.track.duration_ms}
            setRandomColor={setRandomColor}
            id={item.track.id}
            isPlaying={(item.track.id === audio.dataset.track_id) ? true : false}
          />
        ))}
      </div>
    </div>
  ) : (
    <div className="preloader">
      <IconPreloader width={50} height={50} />
    </div>
  );
}

export default PlaylistPage;
