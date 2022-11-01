import {attr, Model} from "redux-orm";
import {createAction} from "@reduxjs/toolkit";


export type CartFields = {
    id: string;
    productId: number;
    variationId: number;
    productImg: string;
    quantity: number
}
type AddToCartType = {
    productId: number;
    variationId: number;
    productImg: string;
}
type ChangeQuantityType = {
    productId: number | string;
    variationId: number | string
    amount: number
}

export const addToCart = createAction<AddToCartType>("models/cart/create");
export const changeQuantity = createAction<ChangeQuantityType>("models/cart/change");
export const deleteFromCart = createAction<Omit<ChangeQuantityType, 'amount'>>("models/cart/delete");
export const clearCart = createAction("models/cart/clear");
export const hydrateCart = createAction<CartFields[]>("models/cart/hydrate");

interface IAddToCart {
    type: "models/cart/create"
    payload: AddToCartType
}
interface IChangeQuantity {
    type: "models/cart/change"
    payload: ChangeQuantityType
}
interface IDeleteFromCart {
    type: "models/cart/delete"
    payload: Omit<ChangeQuantityType, 'amount'>
}
interface IHydrateCart {
    type: "models/cart/hydrate"
    payload: CartFields[]
}
interface IClearCart {
    type: "models/cart/clear"
    payload?: never
}

type IActions = IAddToCart | IDeleteFromCart | IChangeQuantity | IHydrateCart | IClearCart

export class Cart extends Model {
    static get fields() {
        return {
            id: attr(),
            productId: attr(),
            variationId: attr(),
            productImg: attr(),
            quantity: attr(),
        };
    }

    static reducer({type, payload}: IActions, Cart: any, session: any) {
        switch (type) {
            case "models/cart/create": {
                let cartElem = Cart.withId(`${payload.productId}${payload.variationId}`)
                if (cartElem) {
                    cartElem?.update(
                        {
                            quantity: cartElem.quantity + 1
                        }
                    )
                } else {
                    Cart.create({
                        id: `${payload.productId}${payload.variationId}`,
                        quantity: 1,
                        ...payload
                    })
                }
                break;
            }
            case "models/cart/delete": {

                const {
                    productId,
                    variationId
                } = payload
                let cartElem = Cart.withId(`${productId}${variationId}`)
                cartElem?.delete();
                break;
            }
            case 'models/cart/change': {
                const {
                    productId,
                    variationId,
                    amount
                } = payload
                let cartElem = Cart.withId(`${productId}${variationId}`)
                if (cartElem.quantity < 2 && amount < 0) {
                    cartElem?.delete()
                    break
                }
                if (cartElem) {
                    cartElem?.update(
                        {
                            quantity: cartElem.quantity + amount
                        }
                    )
                }
                break;
            }
            case 'models/cart/hydrate': {
                payload.forEach(value => Cart.create(value))
                break;
            }
            case 'models/cart/clear': {
                Cart.all().toModelArray().forEach((value:any)=>{
                    value.delete()
                })
                break;


            }
            default:
                break;

        }
    }
}

Cart.modelName = "Cart";
