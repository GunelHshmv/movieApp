export interface Genre {
  id: number;
  name: string;
}
export interface Movie {
  id: number;
  title: string;
  overview: string;
  vote_count: number;
  vote_average: number;
  release_date: string;
  poster_path: string;
  runtime: number;
  popularity:number;
  poster: string;
  genre: number[];
  playLink: string;
  description: string;
  cast:string[];
 backdrop_path:string
}


export interface GenreWithMovies extends Genre {
  movies: Movie[];
}

export interface Show {
  id: number;
  title: string;
  overview: string;
  vote_count: number;
  vote_average: number;
  release_date: string;
  first_air_date: string;
  poster_path: string;
  runtime: number;
  popularity:number
}

export interface Season {
  season_number: number;
  name: string;
  poster_path: string | null;
  air_date: string;
}


export interface GenreWithShows {
  id: number;
  name: string;
  shows: Show[];
}
