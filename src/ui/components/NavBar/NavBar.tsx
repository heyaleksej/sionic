import React, {FC, memo} from 'react';
import classes from './NavBar.module.css'
import {ReactComponent as GeoIcon} from '../../../assets/icons/geoTag.svg'
import {ReactComponent as SearchIcon} from '../../../assets/icons/search.svg'
import {ReactComponent as CartIcon} from '../../../assets/icons/cart.svg'
import {Link} from "react-router-dom";
import {useAppSelector} from "../../../bll/hooks/hooks";
import {cartSelector} from "../../../bll/reduxOrm/selectors/selectors";
// @ts-ignore
import ava from './../../../assets/images/header/ava.jpg'

const NavBar: FC = () => {

    const cart = useAppSelector(state => cartSelector(state))

    return (
        <div className={classes.container}>
            <Link className={classes.logo} to={'/'}>React</Link>
            <div className={classes.geo_section}>
                <GeoIcon className={classes.geo_icon}/>
                <div> Пермь </div>
            </div>
            <div className={classes.search_section}>
                <input
                    className={classes.search_input}
                    placeholder={'Поиск бренда, товара, категории'}
                />
                <button
                    className={classes.search_btn}
                >
                    <SearchIcon/>
                </button>
            </div>
            <Link className={classes.cart} to={'/cart'}>
                <CartIcon
                />
                <h3 className={classes.cart_counter}>
                    {
                        cart.length > 0 && cart.length
                    }
                </h3>
            </Link>
            <Link to={'/order-history'}>
                <img className={classes.avatar} src={ava}/>
            </Link>
        </div>
    );
};

export default memo(NavBar);