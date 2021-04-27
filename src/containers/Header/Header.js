import React, { Component } from 'react';
import {FaGithub} from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { connect } from 'react-redux';

import './Header.css';
import Logo from '../../components/Logo/Logo';
import Navigations from '../../components/Navigations/Navigations';
import Link from '../../components/UI/Link/Link';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';

class Header extends Component{
    getMovies = (category, movieType) => {
        this.props.onGetMovies(category, movieType, 1);
    };
    getMoviesByGenre = genreId => {
        this.props.onGetMoviesByGenre(genreId, 1);
    };
    render(){
        return(
            <div className='Header'>
                <div className='Header-Left-Container'>
                    <Logo/>
                    <Navigations getMovies={this.getMovies} getMovieByGenre={this.getMoviesByGenre}/>
                    <form style={{display:'flex',alignItems:'center'}}>
                        <Input inputType='Search-Input' placeholder='Search for a movie, tv show, person...'/>
                        <Button type='submit' btnType='Search-Button'>
                            <IoIosSearch/>
                        </Button>
                    </form>
                </div>
                <div className='Header-Right-Container'>
                    <Link margin={20} title='Github Repository' size={23} color='#414141' url='https://github.com/shoki61/react-movie-app'>
                        <FaGithub/>
                    </Link>
                    <Link title='TMDB Website' url='https://www.themoviedb.org'>
                        <img height='20' src={require('../../assets/referenceLogo.png').default} alt='TMDB'/>
                    </Link>
                </div>
            </div>
        );
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetMovies: (category, movieType, value) => dispatch(actions.getMovies(category, movieType, value)),
        onGetMoviesByGenre: (genreId, page) => dispatch(actions.getMoviesByGenre(genreId, page))
    };
};

export default connect(null, mapDispatchToProps)(Header);
