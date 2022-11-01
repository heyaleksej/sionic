import React, {FC, FormEvent, memo, useState} from 'react';
import {activeOrderSelector} from "../../../bll/reduxOrm/selectors/selectors";
import {Navigate, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Button from "../../components/Button/Button";
import classes from './CreateOrder.module.css'
import FormInput from "../../components/FormInput/FormInput";
import {FormElementType} from "../../../types/types";
import {useAppDispatch} from "../../../bll/hooks/hooks";
import {addOrder} from "../../../bll/reduxOrm/models/ordersHistory";
import {clearCart} from "../../../bll/reduxOrm/models/cart";

type CreateOrderProps = {}


const formElements = [
    {
        uuid: 1,
        name: 'date',
        type: 'date',
        placeholder: 'Выберите дату',
        errorMessage: 'Пожалуйста, укажите дату',
        label: 'Когда доставить?',
        required: true
    },
    {
        uuid: 2,
        name: 'address',
        type: 'text',
        placeholder: 'Выберите адрес доставки',
        errorMessage: 'Это обязательно поле',
        label: 'Куда доставить?',
        required: true
    },
    {
        uuid: 3,
        name: 'name',
        type: 'text',
        placeholder: '',
        errorMessage: 'Это поле обязательно',
        label: 'Имя',
        required: true
    },
    {
        uuid: 4,
        name: 'tel',
        type: "number",
        placeholder: '+7 () ',
        errorMessage: 'Это поле обязательно',
        label: 'Телефон',
        required: true
    },
] as FormElementType

const CreateOrder: FC<CreateOrderProps> = (props: CreateOrderProps) => {

    const {} = props

    const navigator = useNavigate()

    const [formState, setFormState] = useState<Record<string, string>>(formElements.reduce((previousValue, currentValue) => {
        previousValue[currentValue.name] = ''
        return previousValue
    }, {} as Record<string, string>))

    const activeOrder = useSelector(state => activeOrderSelector(state))
    const dispatch = useAppDispatch()



    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(addOrder({
            orderPrice: activeOrder[0].orderPrice + 200,
            orderAddress: formState['address'],
            orderDate: formState['date'],
            orderProducts: activeOrder[0].orderProducts,
            orderUUID: 1,
        }))
        dispatch(clearCart())
        navigator('/order-history')
    }
    if (activeOrder.length < 1) {
        return <Navigate to={'/'}/>
    }

    return (
        <div  className={classes.wrapper}>
            <h2>Доставка</h2>
            <form onSubmit={handleFormSubmit}
                  className={classes.container}
                  >

                <div className={classes.form_container}>
                    {formElements.map((value, index) => {

                        const {uuid, name} = value

                        return <FormInput
                            key={uuid}
                            value={formState[name]}
                            onChange={(event => setFormState(prevState => {
                                return {
                                    ...prevState,
                                    [name]: event.target.value
                                }
                            }))}
                            {...value}
                        />
                    })}
                </div>
                <div className={classes.submit_container}>
                    <div className={classes.submit_element_container}>
                        <div className={classes.submit_element_property_container}>
                            <span> Стоимость товаров:</span>
                            <h3>{activeOrder[0].orderPrice}</h3>
                        </div>
                        <div className={classes.submit_element_property_container}>
                            <span>Стоимость доставки:</span>
                            <h3> 200 </h3>
                        </div>
                        <div className={classes.submit_element_property_container}>
                            <span>Итого:</span>
                            <h2> {activeOrder[0].orderPrice + 200} </h2>
                        </div>
                    </div>
                    <Button>Оформить</Button>
                </div>
            </form>
        </div>
    );
};

export default memo(CreateOrder);


