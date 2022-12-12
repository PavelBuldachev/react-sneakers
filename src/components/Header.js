import React, { useContext } from "react";
import { Link } from 'react-router-dom';

import { AppContext } from "../App";

function Header(props) {

    const { cartItems } = useContext(AppContext);
    const totalPrice = cartItems.reduce((sum, obj) => (sum + obj.price), 0);

    return (

        <header className="d-flex justify-between align-center p-40">

            <Link to="/">
                <div className="d-flex align-center">
                    <img width={40} height={40} src="/img/logo.svg" alt="logo" />
                    <div>
                        <h3 className="text-uppercase">React Sneakers</h3>
                        <p className="opacity-5">Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>

            <ul className="d-flex">
                <li onClick={props.onClickCart} className="mr-30 cu-p">
                    <img width={18} height={18} src="/img/cart.svg" alt="cart" />
                    <span>{totalPrice} руб.</span>
                </li>
                <li className="mr-20 cu-p">
                    <Link to="/favorites">
                        <img width={18} height={18} src="/img/favorite.svg" alt="favorite" />
                    </Link>
                </li>
                <li>
                    <Link to="/orders">
                        <img width={18} height={18} src="/img/user.svg" alt="user" />
                    </Link>
                </li>
            </ul>

      </header>
    );
}

export default Header