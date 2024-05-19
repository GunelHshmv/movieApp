import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

import './Trending.scss';
import { fetchTrendingMovies } from '../../../TMDB/tmdbServices';
import { Movie } from '../../../modules/data';

import navnext from '../../../assets/icons/navnext.png';
import left from '../../../assets/icons/left.png';
import view from '../../../assets/icons/view.png';
import watch from '../../../assets/icons/watch.png';

const formatViewCount = (count: number): string => {
    return count >= 1000 ? (count / 1000).toFixed(1) + 'K' : count.toString();
};

const Trending: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const trendingMovies = await fetchTrendingMovies();
            setMovies(trendingMovies);
        };
        fetchMovies();
    }, []);

    return (
        <div className='trending-swiper'>
            <div className='header-trending'>
                <h1>Trending Now</h1>
                <div className='trending-control'>
                    <div className='trending-button'>
                        <div className='swiper-button-prev-trending'>
                            <img width='28px' height='28px' src={left} alt="Previous" />
                        </div>
                        <div className='swiper-pagination-trending'></div>
                        <div className='swiper-button-next-trending'>
                            <img width='24px' height='24px' src={navnext} alt="Next" />
                        </div>
                    </div>
                </div>
            </div>
            <Swiper
                slidesPerView={2}
                spaceBetween={10}
                navigation={{
                    nextEl: '.swiper-button-next-trending',
                    prevEl: '.swiper-button-prev-trending',
                }}
                pagination={{
                    clickable: true,
                    el: '.swiper-pagination-trending',
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
                className='trendingSwiper'
            >
                {movies.map(movie => (
                    <SwiperSlide key={movie.id} className='trending-slides'>
                        <div className='movie-posters-trending'>
                            <div className='movie-trending-img'>
                                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                            </div>
                            <div className='trend-post'>
                                <div className='trend-post-inner'>
                                    <img src={watch} alt='Runtime icon' /> {isNaN(movie.runtime) ? '1h 30min' : `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
                                </div>
                                <div className='trend-post-inner'>
                                    <img src={view} alt='View count icon' /> {formatViewCount(movie.vote_count)}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Trending;
