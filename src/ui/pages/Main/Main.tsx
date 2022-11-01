import React, {memo, useEffect, useRef, useState} from 'react';
import {RangeType, ProductType} from "../../../types/types";
import ProductCard from "../../components/ProductCard/ProductCard";
import classes from './Main.module.css'
import productsApi from "../../../api/api";


const Main = () => {


    const lastElem = useRef<any>();
    const observer = useRef<any>();

    const [range, setRange] = useState<RangeType>([0, 10])
    const [isLast, setIsLast] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState<ProductType[]>([])
    const [categories, setCategories] = useState<Record<number, string>>({})
    const [activeCategoryId, setActiveCategoryId] = useState<string | number>()

    useEffect(() => {
        setIsLoading(true)
        if (Object.keys(categories).length < 1) {

            productsApi.getProductCategories({}).then((data) => {
                const obj = data.reduce<Record<number, string>>((acc, data) => {
                    acc[data["id"]] = data["name"]
                    return acc}, {})

                setCategories(obj)

            })
        }
        productsApi.fetchData<ProductType>({
            range: range,
            sort: ['id', 'ASC'],
            ...(activeCategoryId && {
                filter: {category_id: Number(activeCategoryId)}})
        }, '/Products').then((data) => {
            if (data.length <= 0) {
                setIsLast(true)
                return
            }

            setProducts(prevState => {
                if (range[0] === 0) {
                    return [...data]
                }
                return [...prevState, ...data]
            })
            setIsLast(false)

        }).finally(() => {
            setIsLoading(false)
        })


    }, [range[1]])


    const handleCategoryClick = (id: number | string) => {
        setActiveCategoryId(id)
        if (range[0] === 0) {
            setIsLoading(true)
            productsApi.fetchData<ProductType>({
                range: [0, 10],
                sort: ['id', 'ASC'],
                filter: {category_id: Number(id)}

            },'/Products').then((data) => {
                if (data.length <= 0) {
                    setIsLast(true)
                    return
                }

                setProducts([...data])
                setIsLast(false)

            }).finally(() => setIsLoading(false))
            return
        }
        setIsLoading(true)
        setRange([0, 20])
    }


    useEffect(() => {
        if (isLast) {
            if (observer.current) observer.current.disconnect();
            return;
        }

        if (observer.current) observer.current.disconnect();

        const observerCallback = (entries: any[]) => {

            if (entries[0].isIntersecting && !isLoading) {

                setRange((prevState) => {
                    return [prevState[1] + 1, prevState[1] + 10]
                })
            }
        }

        observer.current = new IntersectionObserver(observerCallback)
        observer.current.observe(lastElem.current)
    }, [isLoading, isLast]);

    return (
        <div className={classes.container}>
            <h2>Категории</h2>
            <div className={classes.category_section}>
                {
                    Object.entries(categories).map(value => {
                        return (
                            <button
                                key={value[0]}
                                className={classes.category_btn}
                                onClick={() => handleCategoryClick(value[0])}
                                style={{backgroundColor:`var(--category_${value[0]})`, filter: activeCategoryId == value[0] ? 'brightness(1.5)' : "none"}}
                            >
                                <h4>{value[1]}</h4>
                            </button>
                        )
                    })
                }
            </div>
            <div className={classes.product_container}>
                {
                    products?.map(value => {
                        return (
                            <ProductCard
                                key={value.id}
                                categories={categories}
                                {...value}
                            />
                        )
                    })
                }
                {isLast && <h3> Вы посмотрели все товары</h3>}
                <div ref={lastElem} className={classes.observer}></div>
            </div>

        </div>
    );
};

export default memo(Main);