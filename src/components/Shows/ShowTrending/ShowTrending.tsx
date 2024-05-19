import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import './ShowTrending.scss'; 
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import { fetchTrendingShows, fetchShowSeasons } from "../../../TMDB/tmdbServices";
import { Season, Show } from "../../../modules/data";
import TrendingShowCard from "./TrendingShowCard";

const Trending: React.FC = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [seasons, setSeasons] = useState<{ [key: number]: Season[] }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trendingShows = await fetchTrendingShows();
        setShows(trendingShows);
        const seasonsData: { [key: number]: Season[] } = {};
        for (const show of trendingShows) {
          const showSeasons = await fetchShowSeasons(show.id);
          seasonsData[show.id] = showSeasons;
        }
        setSeasons(seasonsData);
      } catch (error) {
        console.error('Error fetching trending shows or seasons:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='showTrending-swiper'>
      <div className='header-showTrending'>
        <h1>Trending Shows Now</h1>
        <div className='showTrending-control'>
          {/* Your navigation controls */}
        </div>
      </div>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        navigation={{
          nextEl: '.swiper-button-next-showTrending',
          prevEl: '.swiper-button-prev-showTrending',
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination-showTrending',
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
        className="showTrendingSwiper"
      >
        {shows.map(show => (
          <SwiperSlide key={show.id} className='showTrending-slides'>
            <TrendingShowCard show={show} seasons={seasons[show.id]} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Trending;
