import React, {FC} from 'react';
import style from './Search.module.css';
import {ReactComponent as SearchLogo} from '../../../assets/images/header/magnifier.svg';

export const Search: FC = () => {
    return (
        <div className={style.searchBar}>
            <input type="text"
                   name="search"
                   placeholder="Поиск бренда, товара, категории..."
                   className={style.inputSearch}
            />
            <button type="button"
                    className={style.btnSearch}>
                <SearchLogo/>
            </button>
        </div>
    )
}

