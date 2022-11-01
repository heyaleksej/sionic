import React, {FC, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import {DropDown, MenuItem} from "4c656f_react_ui_kit";
import s from './Product.module.css'

import productsApi from "../../../api/api";
import { ProductVariationList, VariationPropertiesType, VariationPropsType, ProductVariationsType } from '../../../types/types';
import { useAppDispatch } from '../../../bll/hooks/hooks';
import { addToCart } from '../../../bll/reduxOrm/models/cart';
import CustomImage from '../../components/CustomImage/CustomImage';
import Button from '../../components/Button/Button';

type ProductProps = {
    productVariationProperties?: VariationPropertiesType[]
    propertiesObj?: Record<number, ProductVariationList>
}

const calculateProperty = (
    variationId: number,
    propertyId: number,
    type: number,
    propertyObj: Record<string, ProductVariationList>,

    variationProperty: Map<string, VariationPropsType>
) => {

    switch (type) {
        case 0:
            return variationProperty.get(`${propertyId}${variationId}`)?.value_string
        case 1:
            return variationProperty.get(`${propertyId}${variationId}`)?.value_int
        case 2:
            return variationProperty.get(`${propertyId}${variationId}`)?.value_float
        case 3:
            const index = variationProperty.get(`${propertyId}${variationId}`)?.product_variation_property_list_value_id
            return propertyObj[index ? index : 0]?.title
        default:
            return "string"
    }
}

const Product: FC<ProductProps> = (props: ProductProps) => {

    const {
        productVariationProperties,
        propertiesObj
    } = props

    const dispatch = useAppDispatch()


    const {productId} = useParams()

    const [isRenderProperties, setIsRenderProperties] = useState(false)

    const [variationId, setVariationId] = useState<number>(0)

    const [dropDownIndex, setDropDownIndex] = useState<number>()

    const [imageUrl, setImageUrl] = useState<string>()

    const [variations, setVariations] = useState<Map<string | number, ProductVariationsType>>(new Map<string | number, ProductVariationsType>())

    const [variationProperties, setVariationProperties] = useState<Map<string, VariationPropsType>>(new Map<string, VariationPropsType>())

    const getProductVariations = async () => {
        if (!productId) return
        const prodId = Number(productId)
        const product = await productsApi.getProductImages({filter: {product_id: prodId}})

        setImageUrl(product[0].image_url)


        const data = await productsApi.getProductVariations({filter: {product_id: prodId}})

        setVariationId(data[0].id)
        data.forEach((value:any) => setVariations(prevState => prevState.set(value.id, value)))


        const values = await productsApi.getProductVariationPropertyValues(
            {
                filter: {product_variation_id: data.map((val:any) => val.id)},
                sort: ["id", 'ASC']
            })

        values.forEach((value:any) => {

            setVariationProperties(prevState => {
                    prevState.set(`${value.product_variation_property_id}${value.product_variation_id}`, value)
                    return prevState
                }
            )

        })
        setIsRenderProperties(true)


    }


    useEffect(() => {
        getProductVariations()
    }, [productId])




    const handleDropDown = (item: number) => {
        setDropDownIndex(item)
    }
    useEffect(() => {

        const variationId = variations.get(Array.from(variations.keys())[dropDownIndex ? dropDownIndex : 0])?.id
        //@ts-ignore
        setVariationId(variationId)
    }, [dropDownIndex])


    const handleAddToCart = () => {
        if (!variations?.get(variationId)?.stock) return
        if (!productId || !imageUrl) return;
        dispatch(addToCart({
            productId: Number(productId),
            productImg: imageUrl,
            variationId: variationId,
        }))
    }

    return (
        <div className={s.container}>
            <CustomImage
                className={s.image}
                src={imageUrl}
            />
            <div className={s.price_properties_container}>
                <div className={s.price_stock_container}>
                    <div>
                        <span>цена:</span>
                        <h1 className={s.price}>
                            {variations?.get(variationId)?.price}
                        </h1>
                    </div>
                    <div>
                        <span>наличие:</span>
                        <span>{variations?.get(variationId)?.stock}</span>
                    </div>
                </div>
                <DropDown
                    colorIndex={'1'}
                    label={variations.get(variationId)?.id.toString() ?? 'Выбать'}
                    onChange={handleDropDown}>
                    {Array.from(variations.keys()).map((value) => {
                        return (
                                <MenuItem
                                    key={value}
                                    value={variations.get(value)?.id}>
                                    {variations.get(value)?.id.toString()}
                                </MenuItem>
                            )
                        })

                    }
                </DropDown>
                <div className={s.properties_container}>
                    {(() => {
                            if (isRenderProperties && propertiesObj) {
                                return productVariationProperties?.map((data) => {

                                    let dataString = calculateProperty(
                                        variationId,
                                        data.id,
                                        data.type,
                                        propertiesObj,
                                        variationProperties
                                    )

                                    return (
                                        <div
                                            key={data.id}
                                            className={s.properties_container_container}>
                                            <span>{data.name}</span>
                                            <span>{dataString}</span>
                                        </div>
                                    )
                                })
                            }
                            return (
                                <>
                                    {[...Array(10)].map((value, index) => {
                                        return (
                                            <div
                                                className={`loader_bg ${s.properties_loader}`}
                                                key={index}
                                            />
                                        )
                                    })
                                    }
                                </>
                            )
                        })()}
                </div>
                <Button onClick={handleAddToCart}>Add to cart</Button>
            </div>
        </div>
    );
};

export default Product;