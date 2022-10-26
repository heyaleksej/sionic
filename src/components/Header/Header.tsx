import React, {FC} from 'react';
import classes from './Header.module.css';
import {Location} from './Location/Location';
import {Avatar} from './Avatar/Avatar';
import {Basket} from "./Basket/Basket";
import {Search} from "./SearchBar/Search";
import {Logo} from '../common/AppLogo/Logo';

const Header: FC = () => {
    return (
        <div className={classes.header}>
            <Logo/>
            <Location/>
            <Search/>
            <Basket/>
            <Avatar/>
        </div>
    )
}

export default Header;