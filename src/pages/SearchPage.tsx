import React, { useEffect, useState } from 'react'
import { ICategory, ISearchResult } from '../components/interfaces/apiInterfaces';
import Mix from '../components/Mix';
import SearchResultArtist from '../components/view/SearchResultArtist';
import SearchResultSong from '../components/view/SearchResultSong';
import { SearchIcon } from '../icons'
import { searchItems } from '../api/searchItems';
import { getCategories } from '../api/getCategories';
import CategoryCard from '../components/CategoryCard';
import { convertTrackTime } from '../utils/utils';

interface ISearchPage {
  setPlaylistsID: React.Dispatch<React.SetStateAction<string>>;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
}

function SearchPage({ setPlaylistsID, setRandomColor }: ISearchPage) {
  const token = window.localStorage.getItem("token");
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState<ISearchResult | null>(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function foo() {
      setCategories(await getCategories(token));
    }
    foo();
  }, []);

  function renderSearchResult() {

    return (
      <>
        {searchResult &&
          <>
            {searchResult.artists.items.length === 0
              ? <div className='no-results'>
                <h2>No results found.</h2>
                <p>Please make sure your words are spelled correctly or use less or different keywords.</p>
              </div>
              : <div className='render-search-results'>
                <div className='render-search-results__artist-and-track-container'>
                  <div className="search-result-artist__container">
                    <div className="mixes-block-header">
                      <p className="mixes-block-header-title">Artists</p>
                    </div>
                    <SearchResultArtist
                      artistImage={searchResult.artists.items[0].images?.length ? searchResult.artists.items[0].images[0].url : 'https://lab.possan.se/thirtify/images/placeholder-playlist.png'}
                      artistName={searchResult.artists.items[0].name} />
                  </div>
                  <div className='search-result-songs__container'>
                    <div className="mixes-block-header">
                      <p className="mixes-block-header-title">Songs</p>
                    </div>
                    {searchResult.tracks.items.slice(0, 4).map(item => {
                      return (
                        <SearchResultSong
                          image={item.album.images[0].url}
                          name={item.name}
                          author={item.artists[0].name}
                          duration={convertTrackTime(item.duration_ms)}
                          id={item.id}
                          key={item.id + item.album.images[0].url}
                        />
                      )
                    }
                    )}
                  </div>
                </div>
                <div className='render-search-results__albums'>
                  <div className="mixes-block-header">
                    <p className="mixes-block-header-title">Albums</p>
                  </div>
                  <div className="mixes">
                    {searchResult.albums.items.map((item) => (
                      <Mix key={item.id} image={item.images[0].url} name={item.artists[0].name} description={`${item.release_date.split('-')[0]} • ${item.name}`} />
                    ))}
                  </div>
                </div>
              </div>
            }
          </>
        }
      </>
    );
  }

  return (
    <div className="search">
      <form className="search__form">
        <label className="search__label">
          <SearchIcon className="search__svg" />
          <input
            className="search__input"
            type="text"
            placeholder="What do you want to listen to?"
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyUp={async () =>
              setSearchResult(await searchItems(searchKey, token))
            }
          />
        </label>
      </form>
      {searchResult
        ? (renderSearchResult())
        :
        (document.querySelector('.search__input') as HTMLInputElement) !== null &&
          (document.querySelector('.search__input') as HTMLInputElement).value === ''
          ? <>
            <h3 className='search__cards-title'>Browse all</h3>
            <div className="search__cards">
              {categories.length > 0
                ? categories.map((category: ICategory) => {
                  return <CategoryCard image={category.icons[0].url} name={category.name} key={category.name} />
                })
              : ""}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default SearchPage;
