import * as actionTypes from './actionTypes';
import axios from '../../axios';
const API = 'da62c9e3065978f374d0e28af9b5465f';

const getMoviesStart = () => {
    return{
        type: actionTypes.GET_MOVIES_START
    };
};

const getMoviesSuccess = data => {
    return {
        type: actionTypes.GET_MOVIES_SUCCESS,
        movies: data
    };
};

const getMoviesFail = () => {
    return {
        type:actionTypes.GET_MOVIES_FAIL
    };
};


const filteredMostPopular = data => {
    return{
        type: actionTypes.FILTERED_MOST_POPULAR,
        filteredMostPopular: data
    };
};

const getMovieDetailStart = () => {
    return {
        type: actionTypes.GET_MOVIE_DETAIL_START
    };
};

const getMovieDetailSuccess = data => {
    return {
        type: actionTypes.GET_MOVIE_DETAIL_SUCCESS,
        movieDetail: data
    };
};

const getMovieDetailFail = () => {
    return {
        type: actionTypes.GET_MOVIE_DETAIL_FAIL
    };
};

const getCredits = data => {
    return {
        type: actionTypes.CREDITS,
        credits: data
    };
};

const getExternalID = data => {
    return {
        type: actionTypes.EXTERNAL_ID,
        externalID: data
    };
};

const extractMostPopular = () => {
    return dispatch => {
        axios.get(`/movie/popular?api_key=${API}&language=en-US&page=1`)
            .then(response=>{
                const temp = [];
                response.data.results.filter(item => {
                    if(item.vote_average > 7.5){
                        temp.push({
                            movie:item
                        })
                    };
                });
                dispatch(filteredMostPopular(temp));
            })
            .catch(error=>{
            });
    };
};


const getMovies = (category, movieType, value) => {
    console.log(category + movieType + value)
    return dispatch => {
        dispatch(getMoviesStart());
        axios.get(`/${category}/${movieType}?api_key=${API}&language=en-US&page=${value}`)
            .then(response=>{
                dispatch(getMoviesSuccess(response.data, value))
            })
            .catch(error=>{
                dispatch(getMoviesFail())
            });
    };
};


const getMovieDetail = (category, movie_id) =>{
     return dispatch => {
         dispatch(getMovieDetailStart());
         axios.get(`/${category}/${movie_id}?api_key=${API}&language=en-US`)
             .then(response=>{
                 axios.get(`/${category}/${movie_id}/credits?api_key=${API}&language=en-US`)
                     .then(response => {
                         dispatch(getCredits(response.data))
                     })
                     .catch(error => error)
                 axios.get(`/${category}/${movie_id}/external_ids?api_key=${API}`)
                     .then(response => {
                         dispatch(getExternalID(response.data))
                     })
                     .catch(error => error)
                 dispatch(getMovieDetailSuccess(response.data));
             })
             .catch(error=>{
                 dispatch(getMovieDetailFail());
             });
     };
};


const getSimilarMoviesStart = () => {
    return {
        type: actionTypes.GET_SIMILAR_MOVIES_START
    };
};

const getSimilarMoviesSuccess = data => {
    return {
        type: actionTypes.GET_SIMILAR_MOVIES_SUCCESS,
        similarMovies: data
    };
};

const getSimilarMoviesFail = () => {
    return {
        type: actionTypes.GET_SIMILAR_MOVIES_FAIL
    };
};

const getSimilarMovies = (category, id) => {
    return dispatch => {
        dispatch(getSimilarMoviesStart());
        axios.get(`/${category}/${id}/similar?api_key=${API}&language=en-US&page=1`)
            .then(response => {
                dispatch(getSimilarMoviesSuccess(response.data));
            })
            .catch(error => {
                dispatch(getSimilarMoviesFail());
            });
    };
};

const getMoviesByGenre = (genreId, page) => {
    return dispatch => {
        axios.get(`/discover/movie?api_key=${API}&with_genres=${genreId}&page=${page}`)
        .then(response => {
            console.log(response.data)
            dispatch(getMoviesSuccess(response.data))
        })
        .catch(error => error)
    };
};


const getSearchResult = (value, page) => {
    return dispatch => {
        axios.get(`/search/multi?api_key=${API}&language=en-US&query=${value}&page=${page}`)
            .then(response => dispatch(getMoviesSuccess(response.data)))
            .catch(error => error);
    };
};


export {
    getMovies,
    extractMostPopular,
    getMovieDetail,
    getSimilarMovies,
    getMoviesByGenre,
    getSearchResult
};
