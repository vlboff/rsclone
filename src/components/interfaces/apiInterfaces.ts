interface IResponseArtist {
  external_urls: {
    spotify: string;
  };
  followers?: {
    href: string;
    total: number;
  };
  genres?: string[];
  href: string;
  id: string;
  images?: [
    {
      url: string;
      height: number;
      width: number;
    }
  ];
  name: string;
  popularity?: number;
  type: string;
  uri: string;
}

interface IResponseAlbum {
  album_type: string;
  artists: IResponseArtist[];
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: [
    {
      url: string;
      height: number;
      width: number;
    }
  ];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

interface IResponseTrack {
  album: {
    album_type: string;
    artists: [
      {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }
    ];
    available_markets: string[];
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: [
      {
        url: string;
        height: number;
        width: number;
      }
    ];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  };
  artists: IResponseArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: null;
  track_number: number;
  type: string;
  uri: string;
}

export interface ISearchResult {
  albums: {
    href: string;
    items: IResponseAlbum[];
    limit: number;
    next: string;
    offset: number;
    previous: null;
    total: number;
  };
  artists: {
    href: string;
    items: IResponseArtist[];
    limit: number;
    next: string;
    offset: number;
    previous: null;
    total: number;
  };
  tracks: {
    href: string;
    items: IResponseTrack[];
    limit: number;
    next: string;
    offset: number;
    previous: null;
    total: number;
  };
}

export interface ICategory {
  href: string;
  icons: [
    {
      height: number;
      url: string;
      width: number;
    }
  ];
  id: string;
  name: string;
}

export interface IPlaylist {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: IPlaylistItems[];
}

export interface IPlaylistItems {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: [
    {
      url: string;
      height: number;
      width: number;
    }
  ];
  name: string;
  owner: {
    external_urls: {
      spotify: string;
    };
    followers: {
      href: string;
      total: number;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string;
  };
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
}
