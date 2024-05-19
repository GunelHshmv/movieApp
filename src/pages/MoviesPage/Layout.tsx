
import Genr from '../../components/Movies/Genr/Genr';
import GenresPopular from '../../components/Movies/GenresPop/GenresPopular';

import MWatch from '../../components/Movies/MWatch/MWatch';
import Releases from '../../components/Movies/Releases.tsx/Releases';
import Trending from '../../components/Movies/Trending/Trending';
import './Movies.scss'
const Layout = () => {
    return <div>
        <div className="container">
        <div className="movie_div">Movie</div>
        <div className="movie_border">
            <Genr/>
            <GenresPopular/>
            <Trending/>
            <Releases/>
            <MWatch/>
        </div>
        </div>
    </div>;
}

export default Layout;