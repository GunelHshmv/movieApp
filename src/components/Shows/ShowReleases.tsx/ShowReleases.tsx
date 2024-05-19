import React, { useEffect, useState } from "react";
import {  fetchNewReleaseShows, fetchShowSeasons } from "../../../TMDB/tmdbServices";
import { Swiper, SwiperSlide } from 'swiper/react';
import './ShowReleases.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import navnext from '../../../assets/icons/navnext.png';
import left from '../../../assets/icons/left.png';
import Season from '../../../assets/icons/Season.png'
import watch from '../../../assets/icons/watch.png'
import { Navigation, Pagination } from 'swiper/modules';
import { Movie } from "../../../modules/data";

const Releases: React.FC = () => {
  const [releases, setReleases] = useState<Movie[]>([]);
  const [seasonsCount, setSeasonsCount] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const releasesMovies = await fetchNewReleaseShows();
        setReleases(releasesMovies);

        for (const movie of releasesMovies) {
          const showSeasons = await fetchShowSeasons(movie.id);
          setSeasonsCount((prevSeasonsCount) => ({
            ...prevSeasonsCount,
            [movie.id]: showSeasons.length,
          }));
        }
      } catch (error) {
        console.error('Error fetching releases or seasons:', error);
      }
    };

    fetchReleases();
  }, []);

  return (
    <div className='show-releases-swiper'>
      <div className='header-show-releases'>
        <h1>New Releases</h1>
        <div className='show-releases-control'>
          <div className='show-releases-button'>
            <div className='swiper-button-prev-show-releases'>
              <img width='28px' height='28px' src={left} alt="Previous" />
            </div>
            <div className='swiper-pagination-show-releases'></div>
            <div className='swiper-button-next-show-releases'>
              <img width='24px' height='24px' src={navnext} alt="Next" />
            </div>
          </div>
        </div>
      </div>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        navigation={{
          nextEl: '.swiper-button-next-show-releases',
          prevEl: '.swiper-button-prev-show-releases',
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination-show-releases',
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
        className="show-releasesSwiper"
      >
        {releases.map((movie) => (
          <SwiperSlide key={movie.id} className='show-releases-slides'>
            <div key={movie.id} className="show-posters-show-releases">
              <div className="show-show-releases-img">
                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
              </div>
              <div className="show-show-releases-post">
                <div className="show-release-post-inner">
                  <img src={watch} alt="icon" /> {isNaN(movie.runtime) ? '1h 30min' : `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
                </div>
                <div className="show-release-post-inner">
                  <img src={Season} alt="icon" /> {seasonsCount[movie.id] !== undefined ? (
                  <p> {seasonsCount[movie.id]} Seasons</p>
                ) : (
                  <p>Loading seasons...</p>
                )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Releases;