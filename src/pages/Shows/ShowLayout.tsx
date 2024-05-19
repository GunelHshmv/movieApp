
import ShowGenr from '../../components/Shows/ShowGenr/ShowGenr';
import ShowGenresPopular from '../../components/Shows/ShowGenresPop/ShowGenresPopular';

import ShowMWatch from '../../components/Shows/ShowMWatch/ShowMWatch';
import ShowReleases from '../../components/Shows/ShowReleases.tsx/ShowReleases';
import ShowTrending from '../../components/Shows/ShowTrending/ShowTrending';
import '../MoviesPage/Movies.scss'
const ShowLayout = () => {
    return <div>
        <div className="container">
        <div className="movie_div">Show</div>
        <div className="movie_border">
            <ShowGenr/>
            <ShowGenresPopular/>
            <ShowTrending/>
            <ShowReleases/>
            <ShowMWatch/>
        </div>
        </div>
    </div>;
}

export default ShowLayout;