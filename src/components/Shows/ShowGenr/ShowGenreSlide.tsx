import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import right from '../../../assets/icons/right.png';
import navnext from '../../../assets/icons/navnext.png';
import left from '../../../assets/icons/left.png';
import { fetchShowGenresWithShows } from '../../../TMDB/tmdbServices';
import {  GenreWithShows } from '../../../modules/data';
import './ShowGenreSlide.scss';

const GenreSlide: React.FC = () => {
  const [genresWithShows, setGenresWithShows] = useState<GenreWithShows[]>([]);

  useEffect(() => {
    const getGenresWithShows = async () => {
      try {
        const fetchedGenresWithShows = await fetchShowGenresWithShows(4); 
        setGenresWithShows(fetchedGenresWithShows);
      } catch (error) {
        console.error('Error fetching genres with shows:', error);
      }
    };
    getGenresWithShows();
  }, []);

  return (
    <div className='showGenre-swiper'>
      <div className='header-showGenre'>
        <h1>Our Show Genres</h1>
        <div className='showGenre-control'>
          <div className='showGenre-button'>
            <div className='swiper-button-prev-showGenre'>
              <img width='28px' height='28px' src={left} alt='Previous' />
            </div>
            <div className='swiper-pagination-showGenre'></div>
            <div className='swiper-button-next-showGenre'>
              <img width='24px' height='24px' src={navnext} alt='Next' />
            </div>
          </div>
        </div>
      </div>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        navigation={{
          nextEl: '.swiper-button-next-showGenre',
          prevEl: '.swiper-button-prev-showGenre',
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination-showGenre',
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
        className='showGenreSwiper'
      >
        {genresWithShows.map((genre) => (
          <SwiperSlide key={genre.id} className='showGenre-slides'>
            <div className='posters-showGenre'>
              <div className='grid-showGenre'>
                {genre.shows.map((show) => (
                  <div key={show.id} className='poster-showGenre'>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${show.poster_path}`}
                      alt={show.title}
                    />
                  </div>
                ))}
                <div className='gradient-showGenre'></div>
              </div>
              <div className='showGenre-header'>
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
