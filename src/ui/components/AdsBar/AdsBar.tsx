import React, {memo} from 'react'
import styles from './AdsBar.module.css'

// @ts-ignore
import c from './covers/choco.png'
// @ts-ignore
import b from './covers/river.png'
import Icon from '../Footer/SocialIcons/Icon';
import Button from "../Button/Button";
import f from './covers/discounts.svg'

function FirstAds() {

    return     <div className={`${styles.banner} ${styles.discounts}`}>
        <div>
            <Icon icon={f}/>
        </div>
        <div >
            <div className={styles.discountsText}>Получай товары БЕСПЛАТНО!</div>
            <Button className={styles.btn}>Узнать подробнее</Button>
        </div>
    </div>
}

const AdsBar = () => {

    let covers = [c,b]

    const banners = covers.map((image, i) => (
      <div className={styles.banner} key={String(i)} style={{backgroundImage:`url(${image})`}}>
        <div className={styles.text}>
          Новая коллекция
        </div>
      </div>
  ))
  return (
      <div>
          <FirstAds />
          { banners }
      </div>
  )
}

export default memo(AdsBar)
