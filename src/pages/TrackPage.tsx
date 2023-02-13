import React, { useEffect, useState } from "react";
import {
  IArtistsTopTrecks,
  IResponseTrack,
} from "../components/interfaces/apiInterfaces";
import { getTrack } from "../api/getTrack";
import SongAlbumPlaylistPageHeader from "../components/SongAlbumPlaylistPageHeader";
import { IconPreloader } from "../icons";
import { convertTrackTime } from "../utils/utils";
import PageControlPanel from "../components/PageControlPanel";
import { getArtistsTopTrack } from "../api/getArtistsTopTrack";
import TracklistRow from "../components/TracklistRow";

interface ITrackPage {
  trackID: string;
  albumID: string;
  artistID: string;
  randomColor: string;
  setTrackID: React.Dispatch<React.SetStateAction<string>>;
  setArtistID: React.Dispatch<React.SetStateAction<string>>;
  setHeaderName: React.Dispatch<React.SetStateAction<string>>;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
}

function TrackPage({
  trackID,
  albumID,
  artistID,
  randomColor,
  setTrackID,
  setArtistID,
  setHeaderName,
  setRandomColor,
}: ITrackPage) {
  const token = window.localStorage.getItem("token");
  const [track, setTrack] = useState<IResponseTrack | null>(null);
  const [topTracks, setTopTracks] = useState<IArtistsTopTrecks | null>(null);

  console.log(track);

  useEffect(() => {
    if (trackID.length > 0) {
      const foo = async () => {
        setTrack(await getTrack(token, trackID));
        setTopTracks(await getArtistsTopTrack(token, artistID));
      };
      foo();
    }
  }, [setTrack, setTopTracks]);

  useEffect(() => {
    setHeaderName(track ? track.name : "");
    setArtistID(track ? track.album.artists[0].id : "");
  }, [track]);

  return track ? (
    <div className="track-page">
      <SongAlbumPlaylistPageHeader
        color={randomColor}
        image={track.album.images[0].url}
        title={"song"}
        name={track.name}
        age={track.album.release_date.slice(0, 4)}
        owner={track.album.artists[0].name}
        duration={track.duration_ms}
      />
      <div className="tracklist-table">
        <PageControlPanel color={randomColor} />
      </div>
      <div className="popular-tracks">
        <div className="popular-tracks_title">Popular Tracks by</div>
        <div className="popular-tracks_artist">
          {track.album.artists[0].name}
        </div>
        {topTracks?.tracks.map((item, index) => (
          <TracklistRow
            key={`${item.name}${Math.random()}`}
            number={index + 1}
            image={item.album.images[0].url}
            name={item.name}
            trackID={item.id}
            setTrackID={setTrackID}
            duration={item.duration_ms}
            setRandomColor={setRandomColor}
          />
        ))}
      </div>
    </div>
  ) : (
    <div>
      <IconPreloader width={50} height={50} />
    </div>
  );
}

export default TrackPage;
