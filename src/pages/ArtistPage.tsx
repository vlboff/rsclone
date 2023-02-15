import React, { useEffect, useState } from "react";
import { getArtist } from "../api/getArtist";
import { getArtistsTopTrack } from "../api/getArtistsTopTrack";
import {
  IArtistsTopTrecks,
  IResponseArtist,
} from "../components/interfaces/apiInterfaces";
import PageControlPanel from "../components/PageControlPanel";
import SongAlbumPlaylistPageHeader from "../components/SongAlbumPlaylistPageHeader";
import TracklistRow from "../components/TracklistRow";
import { IconPreloader } from "../icons";
import { getSeparateByCommas } from "../utils/utils";

interface IArtistPage {
  trackID: string;
  albumID: string;
  artistID: string;
  randomColor: string;
  setTrackID: React.Dispatch<React.SetStateAction<string>>;
  setArtistID: React.Dispatch<React.SetStateAction<string>>;
  setAlbumID: React.Dispatch<React.SetStateAction<string>>;
  setHeaderName: React.Dispatch<React.SetStateAction<string>>;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
}

function ArtistPage({
  trackID,
  albumID,
  artistID,
  randomColor,
  setTrackID,
  setArtistID,
  setAlbumID,
  setHeaderName,
  setRandomColor,
}: IArtistPage) {
  const token = window.localStorage.getItem("token");
  const [artist, setArtist] = useState<IResponseArtist | null>(null);
  const [topTracks, setTopTracks] = useState<IArtistsTopTrecks | null>(null);

  useEffect(() => {
    if (artistID.length > 0) {
      const foo = async () => {
        setArtist(await getArtist(token, artistID));
      };
      foo();
    }
  }, [artistID]);

  useEffect(() => {
    setHeaderName(artist ? artist.name : "");
    setArtistID(artist ? artist.id : "");

    if (artist) {
      const foo = async () => {
        setTopTracks(await getArtistsTopTrack(token, artist.id));
        // setAlbum(await getAlbum(token, track.album.id));
        // setAlbums(await getArtistsAlbums(token, track.artists[0].id));
      };
      foo();
    }
  }, [artist]);

  const followers =
    String(artist?.followers ? artist.followers.total : "").length > 3
      ? getSeparateByCommas(
          String(artist?.followers ? artist.followers.total : "")
        )
      : artist?.followers
      ? artist.followers.total
      : "";

  return artist ? (
    <div className="artist-page">
      <SongAlbumPlaylistPageHeader
        color={randomColor}
        image={artist.images ? artist.images[0].url : ""}
        title={"artist"}
        name={artist.name}
        followers={`${followers} followers`}
      />

      <div className="tracklist-table">
        <PageControlPanel color={randomColor} setIconHeart={false} />
      </div>

      <div className="popular-tracks">
        <div className="popular-tracks_title">Popular</div>
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

export default ArtistPage;
