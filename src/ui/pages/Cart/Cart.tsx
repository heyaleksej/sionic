import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../bll/hooks/hooks";
import {cartSelector} from "../../../bll/reduxOrm/selectors/selectors";
import {CartFields, changeQuantity, deleteFromCart} from "../../../bll/reduxOrm/models/cart";
import {ProductType, ProductVariationsType} from "../../../types/types";
import s from './Cart.module.css'
import Button from "../../components/Button/Button";
import {ReactComponent as DeleteIcon} from "../../../assets/icons/delete.svg";
import CustomImage from "../../components/CustomImage/CustomImage";
import {Link, useNavigate} from "react-router-dom";
import {addToActiveOrder} from "../../../bll/reduxOrm/models/activeOrder";
import {serializedProduct} from "../../../bll/reduxOrm/models/ordersHistory";
import productsApi from "../../../api/api";
// @ts-ignore
import cartImg from './../../../assets/images/cart.jpg'


type CartType = {
    products: Record<number | string, ProductType>
    variations: Record<number | string, ProductVariationsType>
}


const Cart: FC = () => {

    const cart: CartFields[] = useAppSelector(state => cartSelector(state))

    const dispatch = useAppDispatch()

    const [cartPrice, setCartPrice] = useState<CartType>()

    const [isCartLoading, setIsCartLoading] = useState<boolean>()

    const navigator = useNavigate()

    const getCart = async () => {
        if (cartPrice) return
        setIsCartLoading(true)
        const variants = await productsApi.getProductVariations({
            filter: {id: cart.map(value => value.variationId)},
            sort: ['product_id', 'ASC']
        })
        const products = await productsApi.fetchData<ProductType>({
            filter: {id: cart.map(value => value.productId)},
            sort: ["id", 'ASC']
        }, '/Products')


        setCartPrice(() => {
            return {
                products: products.reduce((previousValue, currentValue) => {
                    previousValue[currentValue.id] = currentValue
                    return previousValue
                }, {} as Record<string | number, ProductType>),
                variations: variants.reduce((previousValue, currentValue) => {
                    previousValue[currentValue.id] = currentValue
                    return previousValue
                }, {} as Record<string | number, ProductVariationsType>)
            }
        })
        setIsCartLoading(false)
    }

    useEffect(() => {
        getCart()
    }, [])

    const calcCartPrice = (): number => {

        if (isCartLoading) return 0
        if (!cartPrice) return 0

        return cart.reduce((prev, value) => {
            if (!cartPrice.variations[value.variationId]?.price) return 0
            return prev + (cartPrice.variations[value.variationId].price * value.quantity)
        }, 0)
    }


    const handleCreateOrder = () => {
        if (cart.length < 1) return

        const calc = cart.reduce((prev, value) => {

            let price = 0
            if (cartPrice?.variations[value.variationId]?.price) {
                price = (cartPrice.variations[value.variationId].price)
            }
            prev['orderPrice'] = price * value.quantity
            prev.orderProducts.push({
                productId: value.productId,
                variationId: value.variationId,
                quantity: value.quantity,
                price: price,
            })

            return prev
        }, {orderPrice: 0, orderProducts: []} as { orderPrice: number, orderProducts: serializedProduct[] })


        dispatch(addToActiveOrder({
            orderPrice: calc.orderPrice,
            orderProducts: calc.orderProducts

        }))
        navigator('/create-order')
    }


    return (
        <div className={s.container}>
            <div className={s.cart_header}>
                <h2>
                    Корзина
                </h2>
            </div>
            <div className={s.cart_price_main_container}>
                <div className={s.cart_price_container}>
                    <div className={s.price}>
                        <h4>Стоимость корзины:</h4>
                        {cartPrice && <h2>{calcCartPrice()}</h2>}
                    </div>
                    <Button
                        className={s.button_checkout}
                        onClick={handleCreateOrder}
                    >Оформить</Button>
                    <img src={cartImg} alt={'logo'} className={s.cartImg}/>
                </div>
                {cartPrice &&
                cart.map((value) => {
                    return (
                        <div
                            className={s.cart_element}
                            key={value['id'] + value["variationId"]}>
                            <Link
                                to={`/product/${value["productId"]}`}
                                className={s.img}>
                                <CustomImage src={value.productImg} className={s.img}/>
                            </Link>
                            <span style={{width:'100px'}}>
                                    {`${cartPrice.products[value.productId]?.name} ${'variation'} #${value["variationId"]}`}
                                </span>
                            <div className={s.quantity_container}>
                                <button onClick={() => dispatch(changeQuantity({
                                    productId: value.productId,
                                    variationId: value.variationId,
                                    amount: 1
                                }))}
                                        className={s.change_button}>+
                                </button>

                                <span>{value.quantity}</span>

                                <button
                                    onClick={() => dispatch(changeQuantity({
                                        productId: value.productId,
                                        variationId: value.variationId,
                                        amount: -1
                                    }))}
                                    className={s.change_button}
                                >-</button>
                            </div>
                            <h2>
                                {cartPrice.variations[value.variationId]?.price}
                            </h2>
                            <button onClick={() => dispatch(deleteFromCart({
                                variationId: value["variationId"],
                                productId: value["productId"]
                            }))}
                                    className={s.change_button}>
                                <DeleteIcon/>
                            </button>
                        </div>
                    )
                })
                }
            </div>
        </div>
    );
};

export default Cart;