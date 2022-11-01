import React, {FC} from 'react';
import style from './SocialIcons.module.css';
import fb from '../../../../assets/images/social/facebook.svg';
import inst from '../../../../assets/images/social/inst.svg';
import vk from '../../../../assets/images/social/vk.svg';
import SocialIcon from "./Icon";

const SocialIcons: FC = () => {
    return (
        <>
            <div>Присоединяйтесь к нам</div>
            <div className={style.socialIconsBlock}>
                <SocialIcon icon={fb} url="https://www.facebook.com/"/>
                <SocialIcon icon={inst} url="https://www.instagram.com/"/>
                <SocialIcon icon={vk} url="https://vk.com/"/>
            </div>
        </>
    )
}

export default SocialIcons;