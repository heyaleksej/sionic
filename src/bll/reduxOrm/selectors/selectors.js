import {createSelector} from "redux-orm";
import {orm} from "../schema";


export const cartSelector = createSelector(orm.Cart);

export const activeOrderSelector = createSelector(orm.ActiveOrder);

export const ordersHistorySelector = createSelector(orm.OrdersHistory);