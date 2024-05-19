import React from "react";
import PageContainer from "../../PageContainer";
import MainComponent from "../../components/Main/MainComponent";
import '../MoviesPage/Movies.scss'
import Layout from "./Layout";
import ShowLayout from "../Shows/ShowLayout";
import Trial from "../../components/Trial/Trial";
const Movies:React.FC = () => {
    return <PageContainer>
        <MainComponent/>
        <Layout/>
        <ShowLayout/>
        <Trial/>
    </PageContainer>;
}

export default Movies;