import React, {FC} from 'react';

type IconPropsType = {
    icon: string
    url: string
}

const SocialIcon: FC<IconPropsType> = ({icon, url}) => {
    return (
        <div>
            <a href={url} target="_blank" rel="noreferrer">
                <img src={icon} alt={'facebook'}/>
            </a>
        </div>
    )
}
export default SocialIcon;