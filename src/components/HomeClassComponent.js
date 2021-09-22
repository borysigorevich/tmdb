import React, {Component, useEffect, useState} from 'react';
//Config
import {BACKDROP_SIZE, IMAGE_BASE_URL, POSTER_SIZE} from "../config";
//Hook
import {useHomeFetch} from "../hooks/useHomeFetch";
//libraries
//Image
import NoImage from '../images/no_image.jpg'
//Components
import HeroImage from "./HeroImage/HeroImage";
import Grid from "./Grid/Grid";
import Thumb from "./Thumb/Thumb";
import {Spinner} from "./Spinner/Spinner.styles";
import SearchBar from "./SearchBar/SearchBar";
import Button from "./Button/Button";
import SearchBarClassComponent from "./SearchBar/SearchBarClassComponent";
import API from "../API";

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
}

class Home extends Component {

    state = {
        movies: initialState,
        searchTerm: '',
        isLoadingMore: false,
        loading: false,
        error: false
    }


    fetchMovies = async (page, searchTerm = '') => {
        try {
            this.setState({error: false, loading: true})

            const movies = await API.fetchMovies(searchTerm, page)

            this.setState(prev => {
                    return {
                        ...prev,
                        movies: {
                            ...movies,
                            results:
                                page > 1 ? [...prev.movies.results, ...movies.results] : [...movies.results]
                        },
                        loading: false
                    }
                }
            )
        } catch (error) {
            console.log(error)
            this.setState({error: true, loading: false})
        }
    }

    handleSearch = searchTerm => {
        this.setState({movies: initialState, searchTerm}, () => {
            this.fetchMovies(1, this.state.searchTerm)
        })
    }

    handleLoadMore = () => {
        this.fetchMovies(this.state.movies.page + 1, this.state.searchTerm)
    }

    componentDidMount() {
        this.fetchMovies(1)
    }

    render() {

        const {searchTerm, movies, loading, error} = this.state

        if (error) {
            return <div>Something get wrong...</div>
        }

        return (
            <>
                {!searchTerm && movies.results[0] &&
                <HeroImage image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${movies.results[0].backdrop_path}`}
                           title={movies.results[0].original_title}
                           text={movies.results[0].overview}/>}
                {/*<SearchBar setSearchTerm={setSearchTerm}/>*/}
                <SearchBarClassComponent setSearchTerm={this.setSearchTerm}/>
                <Grid header={searchTerm ? 'Search Result' : 'Popular Movies'}>
                    {movies.results.map((movie, index) => (
                        <Thumb key={index}
                               clickable
                               image={movie.poster_path ?
                                   IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                                   : NoImage}
                               movieId={movie.id}/>
                    ))}
                </Grid>
                {loading && <Spinner/>}
                {movies.page < movies.total_pages && !loading && (
                    <Button text={'Load More'} callback={this.handleLoadMore}/>
                )}
            </>)
    }
};

export default Home;