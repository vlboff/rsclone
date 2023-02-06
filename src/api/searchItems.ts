import axios from "axios";

export async function searchItems(searchKey: string, token: string | null) {
  if (searchKey !== '') {
    const { data } = await axios.get(`https://api.spotify.com/v1/search?type=artist,track,album`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        market: 'ES',
      }
    });
    return data;
  }
}
