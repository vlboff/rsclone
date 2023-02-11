import axios from "axios";

export async function getPlaylists(token: string | null, playlistID: string) {
  const { data } = await axios.get(
    `https://api.spotify.com/v1/playlists/${playlistID}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
}
