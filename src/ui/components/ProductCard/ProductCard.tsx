import React, {FC, memo, useEffect, useState} from 'react';
import {ProductType} from "../../../types/types";
import {Link} from "react-router-dom";
import s from './ProductCart.module.css'
import Button from "../Button/Button";
import CustomImage from "../CustomImage/CustomImage";
import productsApi from "../../../api/api";

type ProductCardProps = {
    categories: Record<number, string>
} & ProductType

const ProductCard: FC<ProductCardProps> = (props: ProductCardProps) => {


    const [imageUrl, setImageUrl] = useState<string>()

    const [price, setPrice] = useState<number>()

    const [isPriceLoading, setIsPriceLoading] = useState<boolean>(true)

    const {
        categories,
        id,
        name,
        category_id,
    } = props

    useEffect(() => {
        productsApi.getProductImages({
            filter: {product_id: id}
        }).then((data) => {
            setImageUrl(data[0].image_url)
        })
        productsApi.getProductVariations(
            {filter: {product_id: id}, sort: ["price", 'ASC']
            }).then((data) => {
            setPrice(data[0].price)
        }).finally(() => setIsPriceLoading(false))
    }, [])


    return (
        <Link to={`/product/${id}`} className={s.container}>
            <CustomImage
                className={s.image}
                src={imageUrl}
            />

            <button
                className={s.category}
                style={{backgroundColor: `var(--category_${category_id})`}}
            >
                {categories[category_id]}
            </button>

            <h4 className={s.name}>{name}</h4>

            {isPriceLoading ?
                <div className={`loader_bg ${s.price_loader}`}/>
                :
                <>
                    <h2 className={s.price}>
                        {`от: ${price ? price : ""}`}
                    </h2>
                    <span className={s.discountWrap}>
                        <del className={s.oldPrice}>{price}</del>
                        <span className={s.discount}>-0%</span>
                    </span>
                </>

            }

            <Button className={s.cart_btn}>Добавить в корзину</Button>
        </Link>
    );
};

export default memo(ProductCard);