import React from 'react';
import cls from './weather.module.scss'
import { LocationIcon } from '../../icons';

const Weather = () => {
    return (
        <div className={cls.wrapper}>
            <h1>26&deg;C</h1>
            <h2>1st May 23</h2>
            <div className={cls.location}>
                <LocationIcon/>
                <p>San Francisco, CA</p>
            </div>
        </div>
    );
}

export default Weather;
