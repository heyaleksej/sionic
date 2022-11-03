import axios from 'axios'
import {ProductType, ApiProps, CategoryType, ProductImgType, ProductVariationsType,
    VariationPropertiesType, ProductVariationList, VariationPropsType} from "../types/types";


const api = axios.create({
    baseURL: "https://test2.sionic.ru/api"
})


export default class productsApi {

    static async getProduct(id: number | string): Promise<ProductType> {

        const response = await api.get<ProductType>(`/Products/${id}`)

        return response.data

    }

    static async fetchData<T>(props: ApiProps<T>, url:string):Promise<T[]>{
        const {range, sort, filter} = props

        const resp = await api.get<T[]>(url, {
            params: {
                ...(range && {
                    range: JSON.stringify(range)
                }),
                ...(sort && {
                    sort: JSON.stringify(sort)
                }),
                ...(filter && {
                    filter: JSON.stringify(filter)
                }),

            }
        })

        return resp.data
    }


    // static async getProductsList(props: ApiProps<ProductType>): Promise<ProductType[]> {
    //
    //     const {range, sort, filter} = props
    //
    //     const resp = await api.get<ProductType[]>(`/Products`, {
    //         params: {
    //             ...(range && {
    //                 range: JSON.stringify(range)
    //             }),
    //             ...(sort && {
    //                 sort: JSON.stringify(sort)
    //             }),
    //             ...(filter && {
    //                 filter: JSON.stringify(filter)
    //             }),
    //
    //         }
    //     })
    //
    //     return resp.data
    // }

    static async getProductCategories(props: ApiProps<CategoryType>): Promise<CategoryType[]> {
        const {range, sort, filter} = props

        const resp = await api.get<CategoryType[]>('/Categories', {
            params: {
                ...(range && {
                    range: JSON.stringify(range)
                }),
                ...(sort && {
                    sort: JSON.stringify(sort)
                }),
                ...(filter && {
                    filter: JSON.stringify(filter)
                }),
            }
        })

        return resp.data

    }

    static async getProductImages(props: ApiProps<ProductImgType>): Promise<ProductImgType[]> {
        const {range, sort, filter} = props

        const resp = await api.get<ProductImgType[]>('/ProductImages', {
            params: {
                ...(range && {
                    range: JSON.stringify(range)
                }),
                ...(sort && {
                    sort: JSON.stringify(sort)
                }),
                ...(filter && {
                    filter: JSON.stringify(filter)
                }),
            }
        })

        return resp.data

    }

    static async getProductVariations(props: ApiProps<ProductVariationsType>): Promise<ProductVariationsType[]> {
        const {range, sort, filter} = props

        const resp = await api.get<ProductVariationsType[]>('/ProductVariations', {
            params: {
                ...(range && {
                    range: JSON.stringify(range)
                }),
                ...(sort && {
                    sort: JSON.stringify(sort)
                }),
                ...(filter && {
                    filter: JSON.stringify(filter)
                }),
            }
        })

        return resp.data
    }

    static async getProductVariationProperties(props: ApiProps<VariationPropertiesType>): Promise<VariationPropertiesType[]> {
        const {range, sort, filter} = props

        const resp = await api.get<VariationPropertiesType[]>('/ProductVariationProperties', {
            params: {
                ...(range && {
                    range: JSON.stringify(range)
                }),
                ...(sort && {
                    sort: JSON.stringify(sort)
                }),
                ...(filter && {
                    filter: JSON.stringify(filter)
                }),
            }
        })

        return resp.data
    }

    static async getProductVariationPropertyListValues(props: ApiProps<ProductVariationList>): Promise<ProductVariationList[]> {
        const {range, sort, filter} = props

        const resp = await api.get<ProductVariationList[]>('/ProductVariationPropertyListValues', {
            params: {
                ...(range && {
                    range: JSON.stringify(range)
                }),
                ...(sort && {
                    sort: JSON.stringify(sort)
                }),
                ...(filter && {
                    filter: JSON.stringify(filter)
                }),
            }
        })

        return resp.data
    }

    static async getProductVariationPropertyValues(props: ApiProps<VariationPropsType>): Promise<VariationPropsType[]> {

        const {range, sort, filter} = props

        const resp = await api.get<VariationPropsType[]>('/ProductVariationPropertyValues', {
            params: {
                ...(range && {
                    range: JSON.stringify(range)
                }),
                ...(sort && {
                    sort: JSON.stringify(sort)
                }),
                ...(filter && {
                    filter: JSON.stringify(filter)
                }),
            }
        })

        return resp.data
    }
}


