import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './ShowGenresPop.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import right from '../../../assets/icons/right.png';
import navnext from '../../../assets/icons/navnext.png';
import left from '../../../assets/icons/left.png';
import { Navigation, Pagination } from 'swiper/modules';
import {   fetchShowGenres, fetchPopularShowsByGenre } from "../../../TMDB/tmdbServices";
import { Genre, Show } from '../../../modules/data';

const GenresPopular: React.FC = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [popularShows, setPopularShows] = useState<{ [key: number]: Show[] }>({});

    useEffect(() => {
        const getGenres = async () => {
            try {
                const genres = await fetchShowGenres();
                setGenres(genres);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };
        getGenres();
    }, []);

    useEffect(() => {
        const fetchPopularShows = async () => {
            try {
                const popularShowsData: { [key: number]: Show[] } = {};
                for (const genre of genres) {
                    const showsData = await fetchPopularShowsByGenre(genre.id);
                    popularShowsData[genre.id] = showsData.slice(2, 6);
                }
                setPopularShows(popularShowsData);
            } catch (error) {
                console.error('Error fetching popular shows by genre:', error);
            }
        };

        if (genres.length > 0) {
            fetchPopularShows();
        }
    }, [genres]);

    return (
        <div className="showPopGenre_container">
            <div className='showPopGenre-swiper'>
                <div className='header-showPopGenre'>
                    <h1>Popular Top 10 In Genres</h1>
                    <div className='showPopGenre-control'>
                        <div className='showPopGenre-button'>
                            <div className='swiper-button-prev-showPopGenre'>
                                <img width='28px' height='28px' src={left} alt="Previous" />
                            </div>
                            <div className='swiper-pagination-showPopGenre'></div>
                            <div className='swiper-button-next-showPopGenre'>
                                <img width='24px' height='24px' src={navnext} alt="Next" />
                            </div>
                        </div>
                    </div>
                </div>
                <Swiper
                    slidesPerView={2}
                    spaceBetween={10}
                    navigation={{
                        nextEl: '.swiper-button-next-showPopGenre',
                        prevEl: '.swiper-button-prev-showPopGenre',
                    }}
                    pagination={{
                        clickable: true,
                        el: '.swiper-pagination-showPopGenre',
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
                    className="showPopGenreSwiper"
                >
                    {genres.map((genre) => (
                        <SwiperSlide key={genre.id} className='showPopGenre-slides'>
                            <div className="show-posters-showPopGenre">
                                <div className="show-grid-showPopGenre">
                                    {popularShows[genre.id]?.map((show) => (
                                        <div key={show.id} className='show-poster-showPopGenre'>
                                            <img
                                                src={`https://image.tmdb.org/t/p/w200${show.poster_path}`}
                                                alt={show.title}
                                            />
                                        </div>
                                    ))}
                                    <div className='gradinet-showPopGenre'></div>
                                </div>
                                <div className='showPopGenre-header'>
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
