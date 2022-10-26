import React from 'react';
import style from './SocialBlock.module.css';
import SocialIcons from '../SocialIcons/SocialIcons';
import Icon from "../SocialIcons/Icon";
import googlePay from '../../../assets/images/social/google-play.svg';
import appStore from '../../../assets/images/social/app-store.svg';
import {Logo} from "../../common/AppLogo/Logo";

export const SocialBlock = () => {
    return (
        <div className={style.footerSocial}>
            <div className={style.leftBlock}>
                <Logo/>
                <div> <SocialIcons/> </div>
            </div>

            <div className={style.rightBlock}>
                <div>Устанавливайте приложение</div>
                <div className={style.apps}>
                    <Icon icon={googlePay} url="https://pay.google.com/"/>
                    <Icon icon={appStore} url="https://www.apple.com/"/>
                </div>
            </div>
        </div>
    )
}

