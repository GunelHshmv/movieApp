import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './GenresPop.scss'
import 'swiper/css';
import 'swiper/css/pagination';
import right from '../../../assets/icons/right.png'
import navnext from '../../../assets/icons/navnext.png'
import left from '../../../assets/icons/left.png'
import { Navigation, Pagination } from 'swiper/modules';
import { fetchGenres, fetchMovies, fetchPopularMoviesByGenre } from "../../../TMDB/tmdbServices";
import { Genre, Movie } from '../../../modules/data';
const GenresPopular: React.FC = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [popularMovies, setPopularMovies] = useState<{ [key: number]: Movie[] }>({});
    useEffect(() => {
        const getGenres = async () => {
            try {
                const genres = await fetchGenres();
                setGenres(genres);
                fetchMovies()
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };
        getGenres();
    }, []);

    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const popularMoviesData: { [key: number]: Movie[] } = {};
                for (const genre of genres) {
                    const moviesData = await fetchPopularMoviesByGenre(genre.id);
                    popularMoviesData[genre.id] = moviesData.slice(2,6); 
                }
                setPopularMovies(popularMoviesData);
            } catch (error) {
                console.error('Error fetching popular movies by genre:', error);
            }
        };

        if (genres.length > 0) {
            fetchPopularMovies();
        }
    }, [genres]);

    return (
        <div className="popGenre_container">
            <div className='popGenre-swiper'>
      <div className='header-popGenre'>
        <h1>Popular Top 10 In Genres</h1>
        <div className='popGenre-control'>
          <div className='popGenre-button'>
            <div className='swiper-button-prev-popGenre'>
              <img width='28px' height='28px' src={left} alt="Previous" />
            </div>
            <div className='swiper-pagination-popGenre'></div>
            <div className='swiper-button-next-popGenre'>
              <img width='24px' height='24px' src={navnext} alt="Next" />
            </div>
          </div>
        </div>
      </div>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        navigation={{
          nextEl: '.swiper-button-next-popGenre',
          prevEl: '.swiper-button-prev-popGenre',
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination-popGenre',
          type: 'bullets',
          dynamicBullets:true
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
        modules={[Pagination, Navigation]}
        className="popGenreSwiper"
      >
        {genres.map((genre) => (
          <SwiperSlide key={genre.id} className='popGenre-slides'>
          <div className="movie-posters-popGenre">
            <div className="movie-grid-popGenre">
              {popularMovies[genre.id]?.map((movie) => (  
                <div key={movie.id} className='movie-poster-popGenre'>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                  />
                </div>
              ))}
              <div className='gradinet-popGenre'></div>
            </div>
            <div className='popGenre-header'>
            <div className='left_top'>
              <div className='top_pop'>Top 10 In</div>
              <p>{genre.name}</p>
            </div>
              <img src={right} alt='right' />
            </div>
          </div>
        </SwiperSlide>
        ))}
      </Swiper>
    </div>
        </div>
    );
}

export default GenresPopular;
