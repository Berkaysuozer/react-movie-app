import React, { Component } from 'react';

import './Home.css';
import MostPopular from '../../components/MostPopular/MostPopular';

class Home extends Component{
    render(){
        return(
            <div className='Home'>
                <MostPopular/>
            </div>
        );
    };
};

export default Home;
