import React, { useEffect, useState } from "react";
import { fetchReleasesMovies } from "../../../TMDB/tmdbServices";
import { Swiper, SwiperSlide } from 'swiper/react';
import './Releases.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import navnext from '../../../assets/icons/navnext.png';
import left from '../../../assets/icons/left.png';
import { Movie } from "../../../modules/data";

const Releases: React.FC = () => {
  const [releases, setReleases] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchReleases = async () => {
      const releasesMovies = await fetchReleasesMovies();
      setReleases(releasesMovies);
      console.log(releases);
    };
    fetchReleases();
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <div className='releases-swiper'>
      <div className='header-releases'>
        <h1>New Releases</h1>
        <div className='releases-control'>
          <div className='releases-button'>
            <div className='swiper-button-prev-releases'>
              <img width='28px' height='28px' src={left} alt="Previous" />
            </div>
            <div className='swiper-pagination-releases'></div>
            <div className='swiper-button-next-releases'>
              <img width='24px' height='24px' src={navnext} alt="Next" />
            </div>
          </div>
        </div>
      </div>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        navigation={{
          nextEl: '.swiper-button-next-releases',
          prevEl: '.swiper-button-prev-releases',
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination-releases',
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
        className="releasesSwiper"
      >
        {releases.map(movie => (
          <SwiperSlide key={movie.id} className='releases-slides'>
            <div className="movie-posters-releases">
              <div className="movie-releases-img">
                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
              </div>
              <div className="releases-post">
                <p>Released at {formatDate(movie.release_date)}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Releases;
