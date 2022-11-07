import React, { useState } from 'react';
import {FaGithub} from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './Header.css';
import Logo from '../../components/Logo/Logo';
import Navigations from '../../components/Navigations/Navigations';
import Link from '../../components/UI/Link/Link';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';

const Header = props => {
    const history = useHistory();
    const [searchValue, setSearchValue] = useState('');
    

    const inputHandler = event => setSearchValue(event.target.value);

    const getMovies = (category, movieType) => {
        props.onGetMovies(category, movieType, 1);
    };
    const getMoviesByGenre = genreId => {
        props.onGetMoviesByGenre(genreId, 1);
    };
    const getSearchResult = event => {
        event.preventDefault();
        if(!searchValue) return;
        props.onGetSearchResult(searchValue);
        history.push('/movies/result');
    };
        return(
            <div className='Header'>
                <div className='Header-Left-Container'>
                    <Logo/>
                    <Navigations getMovies={getMovies} getMovieByGenre={getMoviesByGenre}/>
                    <form onSubmit={getSearchResult} className='Header-Form'>
                        <Input changed={inputHandler} value={searchValue} inputType='Search-Input' placeholder='Search for a movie, tv show, person...'/>
                        <Button type='submit' btnType='Search-Button'>
                            <IoIosSearch/>
                        </Button>
                    </form>
                </div>
            </div>
        );
};

const mapDispatchToProps = dispatch => {
    return {
        onGetMovies: (category, movieType, value) => dispatch(actions.getMovies(category, movieType, value)),
        onGetMoviesByGenre: (genreId, page) => dispatch(actions.getMoviesByGenre(genreId, page)),
        onGetSearchResult: value => dispatch(actions.getSearchResult(value))
    };
};

export default connect(null, mapDispatchToProps)(Header);
