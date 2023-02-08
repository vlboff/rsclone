import axios from "axios";
import { IResponseTrack } from "../components/interfaces/apiInterfaces";

export let searchedTracks: IResponseTrack[] = [];

export async function searchItems(searchKey: string, token: string | null) {
  if (searchKey !== '') {
    const { data } = await axios.get(`https://api.spotify.com/v1/search?type=artist,track,album`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        market: 'BY',
      }
    });
    searchedTracks = data.tracks.items;
    return data;
  }
}
