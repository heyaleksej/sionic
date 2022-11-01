import React from 'react';
import {SocialBlock} from "./SocialBlock/SocialBlock";
import {BottomText} from "./BottomText";
import s from './SocialBlock/SocialBlock.module.css'

export const Footer = () => {
    return (
        <div className={s.wrapper}>
            <SocialBlock/>
            <BottomText/>
        </div>
    )
}

