import React, {FC} from 'react';
import {ReactComponent as GeoPin} from '../../../assets/images/header/country.svg';
import style from './Location.module.css';

export const Location: FC = () => {
    return (
        <div className={style.location}>
            <GeoPin/>
            <div className={style.city}>Пермь</div>
        </div>
    )
}

