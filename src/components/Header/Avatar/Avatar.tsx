import React from 'react';
import avatar from '../../../assets/images/header/avatar.png';
import style from './Avatar.module.css';

export const Avatar = () => {
    return (
        <div className={style.avatar}>
            <img src={avatar} alt="avatar"/>
        </div>
    )
}

