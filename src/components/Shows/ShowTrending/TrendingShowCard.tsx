import React from "react";
import watch from '../../../assets/icons/watch.png';
import season from '../../../assets/icons/Season.png';
import { Show, Season } from "../../../modules/data";
import './ShowTrending.scss'
interface TrendingShowCardProps {
  show: Show;
  seasons: Season[] | undefined;
}

const TrendingShowCard: React.FC<TrendingShowCardProps> = ({ show, seasons }) => (
  <div className="show-posters-showTrending">
    <div className="show-showTrending-img">
      <img src={`https://image.tmdb.org/t/p/w200${show.poster_path}`} alt={show.title} />
    </div>
    <div className="showTrending-post">
      <div className="showTrending-post-inner">
        <img src={watch} alt="icon" /> {isNaN(show.runtime) ? '1h 30min' : `${Math.floor(show.runtime / 60)}h ${show.runtime % 60}m`}
      </div>
      <div className="showTrending-post-inner">
        <img src={season} alt="icon" />{seasons?.length || 'Loading...'} Seasons
      </div>
    </div>
  </div>
);

export default TrendingShowCard;
