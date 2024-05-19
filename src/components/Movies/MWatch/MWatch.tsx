import React, { useEffect, useState } from "react";
import { fetchMustWatch } from "../../../TMDB/tmdbServices";
import { Swiper, SwiperSlide } from 'swiper/react';
import './MWatch.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import navnext from '../../../assets/icons/navnext.png';
import left from '../../../assets/icons/left.png';
import watch from '../../../assets/icons/watch.png';
import { Navigation, Pagination } from 'swiper/modules';
import { Movie } from "../../../modules/data";

const formatViewCount = (count: number): string => {
    return count >= 1000 ? (count / 1000).toFixed(1) + 'K' : count.toString();
};

const convertPopularityToStars = (popularity: number): string => {
    const maxPopularity = 300; 
    const maxStars = 5;
    const normalizedPopularity = Math.min(popularity, maxPopularity) / maxPopularity;
    const starRating = Math.ceil(normalizedPopularity * maxStars);
    return '⭐️'.repeat(starRating);
};

const MWatch: React.FC = () => {
    const [mustWatch, setMustWatch] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMWatch = async () => {
            const releasesMovies = await fetchMustWatch();
            setMustWatch(releasesMovies);
        };
        fetchMWatch();
    }, []);

    return (
        <div className='MWatch-swiper'>
            <div className='header-MWatch'>
                <h1>Must-Watch Movies</h1>
                <div className='MWatch-control'>
                    <div className='MWatch-button'>
                        <div className='swiper-button-prev-MWatch'>
                            <img width='28px' height='28px' src={left} alt="Previous" />
                        </div>
                        <div className='swiper-pagination-MWatch'></div>
                        <div className='swiper-button-next-MWatch'>
                            <img width='24px' height='24px' src={navnext} alt="Next" />
                        </div>
                    </div>
                </div>
            </div>
            <Swiper
                slidesPerView={2}
                spaceBetween={10}
                navigation={{
                    nextEl: '.swiper-button-next-MWatch',
                    prevEl: '.swiper-button-prev-MWatch',
                }}
                pagination={{
                    clickable: true,
                    el: '.swiper-pagination-MWatch',
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
                className="MWatchSwiper"
            >
                {mustWatch.map(movie => (
                    <SwiperSlide key={movie.id} className='MWatch-slides'>
                        <div className="movie-posters-MWatch">
                            <div className="movie-MWatch-img">
                                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                            </div>
                            <div className="MWatch-post">
                                <div className="MWatch-post-inner">
                                    <img src={watch} alt="icon" /> {isNaN(movie.runtime) ? '1h 30min' : `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
                                </div>
                                <div className="MWatch-post-inner">
                                    <p>{convertPopularityToStars(movie.popularity)} {formatViewCount(movie.vote_count)}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MWatch;
