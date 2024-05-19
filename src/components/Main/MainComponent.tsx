import React, { useEffect, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { fetchMovie } from "../../TMDB/tmdbServices";
import play from "../../assets/icons/play.png";
import sound from "../../assets/icons/sound.png";
import like from "../../assets/icons/like.png";
import plus from "../../assets/icons/plus.png";
import navnext from "../../assets/icons/navnext.png";
import left from "../../assets/icons/left.png";
import NavbarComponent from "../Navbar";
import { Movie } from "../../modules/data";
import "./MainComponent.scss";

const MainComponent: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likedMovies, setLikedMovies] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>("");

  const fetchMoviesData = useCallback(async () => {
    try {
      const moviesData = await fetchMovie();
      setMovies(moviesData);
      setLoading(false);
    } catch (error) {
      setError("Error fetching movies.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMoviesData();
  }, [fetchMoviesData]);

  const toggleLike = (movieId: string) => {
    setLikedMovies((prevLikedMovies) =>
      prevLikedMovies.includes(movieId)
        ? prevLikedMovies.filter((id) => id !== movieId)
        : [...prevLikedMovies, movieId]
    );
  };

  const handleFilterChange = (value: string) => {
    setFilter(value); 
  };

  const filteredMovies = filter.trim()
    ? movies.filter((movie) =>
        movie.title.toLowerCase().includes(filter.toLowerCase())
      )
    : movies;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <NavbarComponent onFilterChange={handleFilterChange} />
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        navigation={{
          nextEl: ".swiper-button-next-main",
          prevEl: ".swiper-button-prev-main",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination-main",
          type: "bullets",
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        }}
        cssMode={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mainSwiper"
      >
        {filteredMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="gradinet-genre"></div>
            <div
              className="main-slide"
              style={{ backgroundImage: `url(${movie.backdrop_path})` }}
            >
              <div className="main-detail">
                <h1>{movie.title}</h1>
                <p>{movie.overview}</p>
                <div className="main-btn-group">
                  <a
                    href={movie.playLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="play-btn">
                      <img
                        src={play}
                        style={{ height: "20px", width: "20px" }}
                        alt="Play"
                      />
                      <span>Play Now</span>
                    </button>
                  </a>
                  <div>
                    <button
                      className={`main-icon-btn ${
                        likedMovies.includes(String(movie.id))
                          ? "red-like-btn"
                          : ""
                      }`}
                      onClick={() => toggleLike(String(movie.id))}
                    >
                      <img
                        src={like}
                        style={{ height: "20px", width: "20px" }}
                        alt="Like"
                      />
                    </button>
                    <button className="main-icon-btn">
                      <img
                        src={plus}
                        style={{ height: "20px", width: "20px" }}
                        alt="Add"
                      />
                    </button>
                    <button className="main-icon-btn">
                      <img
                        src={sound}
                        style={{ height: "20px", width: "20px" }}
                        alt="Sound"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="main-button">
                <div className="swiper-button-prev-main">
                  <img width="28px" height="28px" src={left} alt="Previous" />
                </div>
                <div className="swiper-pagination-main"></div>
                <div className="swiper-button-next-main">
                  <img width="24px" height="24px" src={navnext} alt="Next" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainComponent;
