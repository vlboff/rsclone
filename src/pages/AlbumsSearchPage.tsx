import { ISearchResult } from "../components/interfaces/apiInterfaces";
import Mix from "../components/Mix";

interface ISearchPage {
  setPlaylistsID: React.Dispatch<React.SetStateAction<string>>;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
  searchResult: ISearchResult
}

function AlbumsSearchPage({ setPlaylistsID, setRandomColor, searchResult }: ISearchPage) {
  return (
    <div className="mixes">
      {searchResult.albums.items.map((item) => (
        <Mix key={item.id} image={item.images[0].url} name={item.artists[0].name} description={`${item.release_date.split('-')[0]} • ${item.name}`} id={item.id}
          setPlaylistsID={setPlaylistsID}
          setRandomColor={setRandomColor} />
      ))}
    </div>
  )
}

export default AlbumsSearchPage;
