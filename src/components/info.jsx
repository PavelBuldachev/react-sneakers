import React, { useContext } from 'react';

import { AppContext } from '../App';

export const Info = ({ title, discription, image }) => {

    const { setCartOpened } = useContext(AppContext);

  return (

    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
        <img className="mb-20" width={120} src={image} alt="Empty cart"/>
        <h2>{title}</h2>
        <p className="opacity-6">{discription}</p>
        <button onClick={() => setCartOpened()} className="greenButton">
            <img src="/img/arrow.svg" alt="Arrow"/>
            Вернуться назад
        </button>
    </div>
  );
}


