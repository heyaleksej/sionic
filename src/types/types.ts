import {ComponentProps} from "react";


export type FilterType <T> = {
    [K in keyof T]?: T[K] | T[K][]
}

export type RangeType = [number, number]


export type SortType <T> = [
    keyof T,
        'ASC' | 'DESC'
]

export type CategoryType = {
    id: number
    name: string
}

export type ProductType = {
    id: number
    name: string
    category_id: number
    description: string
}

export type ProductImgType = {
    id: number
    image_name: string
    product_id: number
    image_url: string
}

export type ProductVariationsType = {
    id: number
    product_id: number
    price: number
    stock: number
}

export type VariationPropertiesType = {
    id: number
    name: string
    type: number
}


export type VariationPropsType = {
    id: number,
    product_variation_id: number,
    product_variation_property_id: number,
    value_string: string,
    value_int: number,
    value_float: number,
    product_variation_property_list_value_id: number
}

export type ProductVariationList = {
    id: number
    product_variation_property_id: number
    title: string;
    value: string
}



type CustomFromInputProps = {
    uuid: number
    name: string
    label?: string
    errorMessage?: string
}

type DefaultFromInputProps = ComponentProps<'input'>

export type FormElementType = Array<CustomFromInputProps & Omit<DefaultFromInputProps, keyof CustomFromInputProps>>

export type ApiProps<T> = {
    sort?: SortType<T>
    filter?: FilterType<T>,
    range?: RangeType
}