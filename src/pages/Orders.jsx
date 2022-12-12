import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import { AppContext } from "../App";
import Card from "../components/Card";

function Orders() {

    const { onAddToFavorite, onAddToCart } = useContext(AppContext);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('https://638da7a44190defdb749613f.mockapi.io/orders');
                setOrders(data.map(obj => obj.items).flat());
                setIsLoading(false);
            } catch(error) {
                alert('Не удалось вывести заказы!');
            }
        })();

    }, []);

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои заказы</h1>
            </div>
        
            <div className="d-flex flex-wrap">
                {(isLoading ? [...Array(8)] : orders).map((item, index) => (
                  <Card
                    key={index}
                    onFavorite={(obj) => onAddToFavorite(obj)}
                    onPlus={(obj) => onAddToCart(obj)}
                    loading={isLoading}
                    {...item}
                  />
            ))}
            </div>
        </div>
    );
}

export default Orders