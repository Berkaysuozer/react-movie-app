import * as actionTypes from './actionTypes';
import axios from '../../axios';
const API = 'da62c9e3065978f374d0e28af9b5465f';


const personalInformationStart = () => {
    return{
        type: actionTypes.GET_PERSON_DETAIL_START
    };
};

const personalInformationSuccess = data => {
    return{
        type: actionTypes.GET_PERSON_DETAIL_SUCCESS,
        personalInformation: data
    };
};

const personalInformationFail = () => {
    return{
        type: actionTypes.GET_PERSON_DETAIL_FAIL
    };
};

const personalMovieCredits = data => {
    return {
        type: actionTypes.GET_PERSON_MOVIE_CREDITS,
        movieCredits: data
    };
};

const personalTVCredits = data => {
    return {
        type: actionTypes.GET_PERSON_TV_CREDITS,
        TVCredits: data
    };
};

const getPersonalMovieCredits = id => {
    return dispatch => {
        axios.get(`/person/${id}/movie_credits?api_key=${API}&language=en-US`)
            .then(response => {
                dispatch(personalMovieCredits(response.data));
            })
            .catch(err => err);
    };
};

const getPersonalTVCredits = id => {
    return dispatch => {
        axios.get(`/person/${id}/tv_credits?api_key=${API}&language=en-US`)
            .then(response => {
                dispatch(personalTVCredits(response.data));
            })
            .catch(err => err);
    };
};

const getPersonalInformation = id => {
    return dispatch => {
        dispatch(personalInformationStart());
        axios.get(`/person/${id}?api_key=${API}&language=en-US`)
            .then(response => {
                dispatch(getPersonalMovieCredits(id));
                dispatch(getPersonalTVCredits(id));
                const temp = [];
                axios.get(`/person/${id}/external_ids?api_key=${API}&language=en-US`)
                    .then(res=>{
                        temp.push({
                            externalID: res.data,
                            personalInfo: response.data
                        });
                        dispatch(personalInformationSuccess(temp));
                    });
            })
            .catch(error => personalInformationFail());
    };
};


export {
    getPersonalInformation
};
