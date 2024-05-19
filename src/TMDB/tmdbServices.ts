import axios from 'axios';
import { Genre, GenreWithMovies, GenreWithShows, Movie, Season, Show } from '../modules/data';

const API_KEY = '687d9a0aba839b01d017dc3f7a8ed539';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchMovies() {
  try {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&primary_release_date.gte=2024-01-01&sort_by=popularity.desc`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching new releases:', error);
    return null;
  }
}

export const fetchGenres = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.genres;
   
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

export const fetchGenresWithMovies = async (): Promise<GenreWithMovies[]> => {
  try {
    const genresResponse = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
      },
    });

    const genres: Genre[] = genresResponse.data.genres;

    const genresWithMovies = await Promise.all(
      genres.map(async (genre: Genre) => {
        const moviesResponse = await axios.get(`${BASE_URL}/discover/movie`, {
          params: {
            api_key: API_KEY,
            with_genres: genre.id,
            sort_by: 'popularity.desc',
            page: 1,
            language: 'en-US',
          },
        });

        const movies: Movie[] = moviesResponse.data.results.slice(0, 4);  

        return { ...genre, movies };
      })
    );

    return genresWithMovies;
  } catch (error) {
    console.error('Error fetching genres with movies:', error);
    throw error;
  }
};

export const fetchPopularMoviesByGenre = async (genreId:number) => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        with_genres: genreId,
        sort_by: 'popularity.desc',
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies by genre:', error);
    throw error;
  }
};

export const fetchTrendingMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const fetchReleasesMovies= async () : Promise<Movie[]>=>{
  try {
    const response=await axios.get(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`)
    return response.data.results
  } catch (error) {
    console.error('Error fetching data:', error);
     return [];
  }
}

export const fetchMustWatch= async () : Promise<Movie[]>=>{
  try {
    const response=await axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
    return response.data.results
  } catch (error) {
    console.error('Error fetching data:', error);
     return [];
  }
}

export async function fetchShowGenres(): Promise<Genre[]> {
  try {
    const response = await fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`);
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error('Error fetching show genres:', error);
    throw new Error('Failed to fetch show genres');
  }
}

export async function fetchShowGenresWithShows(showCount: number): Promise<GenreWithShows[]> {
  try {
    const genres = await fetchShowGenres();
    const genreWithShowsPromises = genres.map(async (genre) => {
      const response = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${genre.id}`);
      const data = await response.json();
      const shows: Show[] = data.results.slice(0, showCount);
      return { id: genre.id, name: genre.name, shows };
    });
    return Promise.all(genreWithShowsPromises);
  } catch (error) {
    console.error('Error fetching show genres with shows:', error);
    throw new Error('Failed to fetch show genres with shows');
  }
}

export async function fetchPopularShowsByGenre(genreId: number): Promise<Show[]> {
  try {
    const response = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching popular shows by genre:', error);
    throw new Error('Failed to fetch popular shows by genre');
  }
}

export async function fetchTrendingShows(): Promise<Show[]> {
  try {
    const response = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching trending shows:', error);
    throw new Error('Failed to fetch trending shows');
  }
}

export async function fetchNewReleaseShows(): Promise<Show[]> {
  try {
    const response = await fetch(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching new release shows:', error);
    throw new Error('Failed to fetch new release shows');
  }
}
export async function fetchShowSeasons(showId: number): Promise<Season[]> {
  try {
    const response = await fetch(`${BASE_URL}/tv/${showId}?api_key=${API_KEY}`);
    const data = await response.json();
    return data.seasons;
  } catch (error) {
    console.error('Error fetching show seasons:', error);
    throw new Error('Failed to fetch show seasons');
  }
}


export async function fetchMustWatchShows(): Promise<Show[]> {
  try {
      const response = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&sort_by=popularity.desc`);
      const data = await response.json();
      return data.results
  } catch (error) {
      console.error('Error fetching must-watch shows:', error);
      throw new Error('Failed to fetch must-watch shows');
  }
}

export async function fetchMovie(): Promise<Movie[]> {
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=1`);
    const moviesData = response.data.results;
    const movies: Movie[] = moviesData.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      backdrop_path: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
      playLink: `https://www.themoviedb.org/movie/${movie.id}`,
      description: movie.overview,
    }));
    return movies;
  } catch (error) {
    console.error('Error fetching movies from TMDb:', error);
    return [];
  }
}

