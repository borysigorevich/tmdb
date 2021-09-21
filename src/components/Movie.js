import React from 'react';

import {IMAGE_BASE_URL, POSTER_SIZE} from '../config'
//components
import Grid from "./Grid/Grid";
import {Spinner} from "./Spinner/Spinner.styles";
//Hook
import {useMovieFetch} from '../hooks/useMovieFetch'
//Image
import NoImage from '../images/no_image.jpg'
import {useParams} from "react-router-dom";
import BreadCrumb from "./BreadCrumb/BreadCrumb";
import MovieInfo from "./MovieInfo/MovieInfo";
import MovieInfoBar from "./MovieInfoBar/MovieInfoBar";
import Actor from "./Actor/Actor";


const Movie = () => {
        const {movieId} = useParams()
        const {state: movie, loading, error} = useMovieFetch(movieId)


        if (loading) return <Spinner/>
        if (error) return <div>Something went wrong...</div>
        console.log({movie})
        return (
            <>
                <BreadCrumb movieTitle={movie.original_title}/>
                <MovieInfo movie={movie}/>
                <MovieInfoBar time={movie.runtime}
                              budget={movie.budget}
                              revenue={movie.revenue}/>
                <Grid header={'Actors'}>
                    {movie.actors.map(actor => (
                        <Actor key={actor.credit_id}
                               name={actor.name}
                               character={actor.character}
                               imageUrl={
                                   actor.profile_path
                                       ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                                       : NoImage
                               }/>
                    ))}
                </Grid>
            </>
        );
    }
;

export default Movie;