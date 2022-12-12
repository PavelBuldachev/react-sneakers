import React, { useContext, useState } from "react";
import axios from "axios";

import { AppContext } from "../../App";
import { Info } from "../info";
import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onCloseCart, onRemove, items = [], opened }) {

    const { cartItems, setCartItems } = useContext(AppContext);
    const [ isOrderComplete, setIsOrderComplete ] = useState(false);
    const [ orderId, setOrderId ] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const totalPrice = cartItems.reduce((sum, obj) => (sum + obj.price), 0);

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post('https://638da7a44190defdb749613f.mockapi.io/orders', { items: cartItems });
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://638da7a44190defdb749613f.mockapi.io/cart/' + item.id);
                await delay(1000);
              }
            
        } catch(error) {
            alert('Ошибка при создании заказа!');
        }
        setIsLoading(false);
    }

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
                <h2 className="mb-30 d-flex justify-between">Корзина
                    <img
                        className="cu-p"
                        onClick={onCloseCart}
                        src="/img/btn-remove.svg"
                        alt="remove"/>
                </h2>

                {items.length > 0 ?
                    <div className="d-flex flex-column flex">
                        <div className="items flex">
                            {items.map((obj) => (
                                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                    <div
                                        style={{ backgroundImage: `url(${obj.imageUrl})` }}
                                        className="cartItemImg"></div>
                                    <div className="mr-20 flex">
                                        <p className="mb-5">{obj.title}</p>
                                        <b>{obj.price}</b>
                                    </div>
                                        <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="remove"/>
                                </div>
                            ))
                            }
                        </div>
                        <div  className="cartTotalBlock">
                            <ul>
                                <li className="d-flex">
                                <span>Итого:</span>
                                <div></div>
                                <b>{totalPrice} руб.</b>
                                </li>
                                <li className="d-flex">
                                <span>Налог 5%:</span>
                                <div></div>
                                <b>{(totalPrice / 100) * 5} руб. </b>
                                </li>
                            </ul>
                            <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформить заказ<img src="/img/arrow.svg" alt="arrow"/></button>
                        </div>
                    </div>
                     :
                     <Info 
                        title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
                        discription={isOrderComplete
                            ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                            : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                        image={isOrderComplete ? "/img/order.jpg" : "/img/empty-cart.jpg"}
                        />
                }
            </div>
        </div>
    );
}

export default Drawer