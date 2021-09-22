import React, {useContext} from 'react';
import PropTypes from 'prop-types'
//Styles
import {Wrapper, Text, Content} from './MovieInfo.styles'
//Config
import {IMAGE_BASE_URL, POSTER_SIZE} from '../../config'
//Image
import NoImage from '../../images/no_image.jpg'
import Thumb from "../Thumb/Thumb";
import Rate from "../Rate/Rate";
import {Context} from "../../context";
import API from "../../API";

const MovieInfo = ({movie}) => {

    const [user, setUser] = useContext(Context)

    const handleRating = async value => {
        const rate = await API.rateMovie(user.sessionId, movie.id, value)
        console.log({rate})
    }

    return (
        <Wrapper backdrop={movie.backdrop_path}>
            <Content>
                <Thumb image={
                    movie.poster_path
                        ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                        : NoImage
                }
                       clickable={false}
                />
                <Text>
                    <h1>{movie.title}</h1>
                    <h3>PLOT</h3>
                    <p>{movie.overview}</p>
                    <div className="rating-directors">
                        <div>
                            <h3>RATING</h3>
                            <div className={'score'}>{movie.vote_average}</div>
                        </div>
                        <div className={'director'}>
                            <h3>DIRECTOR{movie.directors.length > 1 ? 's' : ''}</h3>
                            {movie.directors.map(director => {
                                return <p key={director.credit_id}>{director.name}</p>
                            })}
                        </div>
                    </div>
                    {user && <div>
                        <p>Rate Movie</p>
                        <Rate callback={handleRating}/>
                    </div>}
                </Text>
            </Content>
        </Wrapper>
    );
};

MovieInfo.propTypes = {
    movie: PropTypes.string
}

export default MovieInfo;