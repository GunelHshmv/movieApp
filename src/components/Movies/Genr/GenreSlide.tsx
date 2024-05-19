import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './GenreSlide.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import right from '../../../assets/icons/right.png';
import navnext from '../../../assets/icons/navnext.png';
import left from '../../../assets/icons/left.png';
import { Navigation, Pagination } from 'swiper/modules';
import {  fetchGenresWithMovies } from '../../../TMDB/tmdbServices';
import {  GenreWithMovies } from '../../../modules/data';

const GenreSlide: React.FC = () => {
  const [genresWithMovies, setGenresWithMovies] = useState<GenreWithMovies[]>([]);

  useEffect(() => {
    const fetchAndSetGenresWithMovies = async () => {
      try {
        const genresWithMoviesData = await fetchGenresWithMovies();
        setGenresWithMovies(genresWithMoviesData);
      } catch (error) {
        console.error('Error fetching genres with movies:', error);
      }
    };
    fetchAndSetGenresWithMovies();
  }, []);

  return (
    <div className='genre-swiper'>
      <div className='header-genre'>
        <h1>Our Genres</h1>
        <div className='genre-control'>
          <div className='genre-button'>
            <div className='swiper-button-prev-genre'>
              <img width='28px' height='28px' src={left} alt="Previous" />
            </div>
            <div className='swiper-pagination-genre'></div>
            <div className='swiper-button-next-genre'>
              <img width='24px' height='24px' src={navnext} alt="Next" />
            </div>
          </div>
        </div>
      </div>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        navigation={{
          nextEl: '.swiper-button-next-genre',
          prevEl: '.swiper-button-prev-genre',
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination-genre',
          type: 'bullets',
          dynamicBullets: true,
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
        className="genreSwiper"
      >
        {genresWithMovies.map((genre) => (
          <SwiperSlide key={genre.id} className='genre-slides'>
            <div className="movie-posters-genre">
              <div className="movie-grid-genre">
                {genre.movies.slice(0, 4).map((movie) => (
                  <div key={movie.id} className='movie-poster-genre'>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </div>
                ))}
                <div className='gradient-genre'></div>
              </div>
              <div className='genre-header'>
                <h3>{genre.name}</h3>
                <img src={right} alt='right' />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GenreSlide;
