import React, {FC} from 'react';
import {ReactComponent as BasketIcon} from '../../../assets/images/header/basket.svg';
import style from './Basket.module.css';

export const Basket: FC = () => {
    return (
        <div className={style.basketWrapper}>
            <BasketIcon/>
            <div className={style.countProducts}>number</div>
        </div>
    )
}

