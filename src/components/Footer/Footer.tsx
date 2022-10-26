import React from 'react';
import {SocialBlock} from "./SocialBlock/SocialBlock";
import {BottomText} from "./BottomText";
import style from './SocialBlock/SocialBlock.module.css'

export const Footer = () => {
    return (
        <div className={style.footer}>
            <SocialBlock/>
            <BottomText/>
        </div>
    )
}

