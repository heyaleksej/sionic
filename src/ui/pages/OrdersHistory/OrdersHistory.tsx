import React, {FC, memo} from 'react';
import {useAppSelector} from "../../../bll/hooks/hooks";
import {ordersHistorySelector} from "../../../bll/reduxOrm/selectors/selectors";
import {OrderFields} from "../../../bll/reduxOrm/models/ordersHistory";
import s from './OrdersHistory.module.css'

const OrdersHistory: FC = () => {

    const orders: OrderFields[] = useAppSelector(state => ordersHistorySelector(state))

    return (
        <div className={s.container}>
            <h2>История заказов</h2>
            <div className={s.order_container}>
                {orders.map(value => {
                    return (
                        <div
                            className={s.order_card}
                            key={value.id}>
                            <div className={s.card_header_section}>
                                <h2>Xiaomi</h2>
                                <span>{value.orderDate}</span>
                            </div>
                            <div className={s.card_section}>
                                <div className={s.card_section_section}>
                                    <span>Статус заказа</span>
                                    <h3>Оплачен/завершён</h3>
                                </div>
                                <div className={s.card_section_section}>
                                    <span>Номер заказа</span>
                                    <h3>{`#${value.id}`}</h3>
                                </div>

                            </div>
                            <div className={s.card_section}>
                                <div className={s.card_section_section}>
                                    <span>кол-во товаров</span>
                                    <h3>
                                        {value.orderProducts.reduce((previousValue, currentValue) => {
                                            return previousValue + currentValue.quantity
                                        }, 0)}
                                    </h3>
                                </div>
                                <div className={s.card_section_section}>
                                    <span>Стоимость товаров</span>
                                    <h3>{value.orderPrice}</h3>
                                </div>
                                <div className={s.card_section_section}>
                                    <span>Адресс доставки</span>
                                    <h3>{value.orderAddress}</h3>
                                </div>
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    );
};

export default memo(OrdersHistory);