import React from 'react';
import style from './Footer.module.css';

export const BottomText = () => {
    return (
        <div className={style.bottomText}>
            <p>© Sionic</p>
            <a href='/'>Правовая информация</a>
            <a href='/'>Политика конфиденциальности</a>
        </div>
    )
}
