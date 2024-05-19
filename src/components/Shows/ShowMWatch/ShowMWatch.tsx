import React, { useEffect, useState } from "react";
import {  fetchMustWatchShows } from "../../../TMDB/tmdbServices";
import { Swiper, SwiperSlide } from 'swiper/react';
import './ShowMWatch.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import navnext from '../../../assets/icons/navnext.png';
import left from '../../../assets/icons/left.png';
import watch from '../../../assets/icons/watch.png';
import { Navigation, Pagination } from 'swiper/modules';
import { Show } from "../../../modules/data";

const formatViewCount = (count: number): string => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    } else {
      return count.toString();
    }
};

const MWatch: React.FC = () => {
    const [mustWatch, setMustWatch] = useState<Show[]>([]);

    useEffect(() => {
        const fetchMWatch = async () => {
            const mustWatchShows = await fetchMustWatchShows();
            setMustWatch(mustWatchShows);
        };
        fetchMWatch();
    }, []);

    const convertPopularityToStars = (popularity: number): string => {
        const maxPopularity = 300; 
        const maxStars = 5;
        const normalizedPopularity = Math.min(popularity, maxPopularity) / maxPopularity;
        const starRating = Math.ceil(normalizedPopularity * maxStars);
        return '⭐️'.repeat(starRating);
    };

    return (
        <div className='show-MWatch-swiper'>
            <div className='header-show-MWatch'>
                <h1>Must-Watch Shows</h1>
                <div className='show-MWatch-control'>
                    <div className='show-MWatch-button'>
                        <div className='swiper-button-prev-show-MWatch'>
                            <img width='28px' height='28px' src={left} alt="Previous" />
                        </div>
                        <div className='swiper-pagination-show-MWatch'></div>
                        <div className='swiper-button-next-show-MWatch'>
                            <img width='24px' height='24px' src={navnext} alt="Next" />
                        </div>
                    </div>
                </div>
            </div>
            <Swiper
                slidesPerView={2}
                spaceBetween={10}
                navigation={{
                    nextEl: '.swiper-button-next-show-MWatch',
                    prevEl: '.swiper-button-prev-show-MWatch',
                }}
                pagination={{
                    clickable: true,
                    el: '.swiper-pagination-show-MWatch',
                    type: 'bullets',
                    dynamicBullets: true
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
                className="show-MWatchSwiper"
            >
                {mustWatch.map(show => (
                    <SwiperSlide key={show.id} className='show-MWatch-slides'>
                        <div key={show.id} className="show-posters-show-MWatch">
                            <div className="show-show-MWatch-img">
                                <img src={`https://image.tmdb.org/t/p/w200${show.poster_path}`} alt={show.title} />
                            </div>
                            <div className="show-MWatch-post">
                                <div className="show-MWatch-post-inner">
                                    <img src={watch} alt="icon" /> {isNaN(show.runtime) ? '1h 30min' : `${Math.floor(show.runtime / 60)}h ${show.runtime % 60}m`}
                                </div>
                                <div className="show-MWatch-post-inner">
                                    <p> {convertPopularityToStars(show.popularity)} {formatViewCount(show.vote_count)}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default MWatch;
