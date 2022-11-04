import React from "react";
import '../css/MovieList.css';

const MovieList = (props) => {
    const FavComponent = props.favComponent;
    return (
        <>
            {props?.movies && props.movies?.map(movie => {
                <div className="image-container d-flex flex-column justify-content-center 
                align-items-center m-3 w-auto">
                    <img src={movie.Poster} alt={movie.Title}></img>
                    <div
                        onClick={() => props.handleFavClick(movie)} 
                        className="overlay d-flex align-items-center justify-content-center"
                    >
                            <FavComponent title={movie.Title} />
                    </div>
                </div>
            })}
        </>
    );
};

export default MovieList;
