import React, {useEffect, useState} from 'react';
import {HashRouter, Route, Routes} from "react-router-dom";
import Product from "./ui/pages/Product/Product";
import Cart from "./ui/pages/Cart/Cart";
import OrdersHistory from "./ui/pages/OrdersHistory/OrdersHistory";
import {ProductVariationList, VariationPropertiesType} from "./types/types";
import './assets/styles/index.css'
import './assets/styles/variables.css'
import CreateOrder from "./ui/pages/CreateOrder/CreateOrder";
import {useAppDispatch} from "./bll/hooks/hooks";
import {hydrateCart} from "./bll/reduxOrm/models/cart";
import {hydrateOrdersHistory} from "./bll/reduxOrm/models/ordersHistory";
import NavBar from './ui/components/NavBar/NavBar';
import AdsBar from './ui/components/AdsBar/AdsBar';
import {Footer} from "./ui/components/Footer/Footer";
import s from './App.module.css'
import adsStyle from './ui/components/AdsBar/AdsBar.module.css'
import Main from './ui/pages/Main/Main';
import productsApi from "./api/api";


function App() {

    const [variationsProperties, setVariationsProperties] = useState<VariationPropertiesType[]>([])
    const [productVariationPropertyListValues, setProductVariationPropertyListValues] = useState<Record<number, ProductVariationList>>({})
    const dispatch = useAppDispatch()

    useEffect(() => {

        const cart = localStorage.getItem('cart')
        const ordersHistory = localStorage.getItem('ordersHistory')
        if (cart) {
            dispatch(hydrateCart(JSON.parse(cart)))
        }
        if (ordersHistory) {
            dispatch(hydrateOrdersHistory(JSON.parse(ordersHistory)))
        }

        productsApi.getProductVariationProperties({
            sort: ["id", 'ASC']
        }).then((data) => {
            setVariationsProperties([...data])
        })
        productsApi.getProductVariationPropertyListValues({}).then(value => {
            const obj = value.reduce((acum, val) => {
                acum[val["id"]] = val
                return acum
            }, {} as Record<number, ProductVariationList>)
            setProductVariationPropertyListValues({...obj})
        })
    }, [dispatch])

    return (
        <HashRouter>
            <span style={{display: 'flex'}}>
                <div className={s.wrapper}>
                    <NavBar/>
                    <Routes>
                <Route path={"*"} element={<h1>notFound</h1>}/>
                <Route path={"/"} element={<Main/>}/>
                <Route path={"/product/:productId"}
                       element={<Product productVariationProperties={variationsProperties}
                                         propertiesObj={productVariationPropertyListValues}/>}
                />
                <Route path={"/cart"} element={<Cart/>}/>
                <Route path={"/create-order"} element={<CreateOrder/>}/>
                <Route path={"/order-history"} element={<OrdersHistory/>}/>
                   </Routes>
                </div>
                <div className={adsStyle.sidebar}>
                   <AdsBar/>
                </div>
            </span>
            <Footer/>
        </HashRouter>
    );
}

export default App;
