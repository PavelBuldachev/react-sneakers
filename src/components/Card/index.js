import React, { useContext, useState } from 'react';
import ContentLoader from "react-content-loader"

import { AppContext } from '../../App';
import styles from './Card.module.scss';

function Card({ onFavorite, onPlus, id, imageUrl, title, price, favorited = false, loading = false}) {

    const { isItemAdded } = useContext(AppContext);
    const [isFavorite, setIsFavorite] = useState(favorited);
    const obj = { id, parentId: id, title, imageUrl, price };

    const onClickPlus = () => {
        onPlus(obj);
    }

    const onClickFavorite = () => {
        onFavorite(obj);
        setIsFavorite(!isFavorite);
    }

    return (
        <div className={styles.card}>
        {loading
        ? <ContentLoader 
                speed={2}
                width={210}
                height={220}
                viewBox="0 0 210 260"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="0" y="0" rx="10" ry="10" width="150" height="130" /> 
                <rect x="118" y="215" rx="8" ry="8" width="32" height="32" /> 
                <rect x="94" y="124" rx="0" ry="0" width="1" height="0" /> 
                <rect x="0" y="170" rx="3" ry="3" width="150" height="15" /> 
                <rect x="0" y="150" rx="3" ry="3" width="93" height="15" /> 
                <rect x="3" y="222" rx="8" ry="8" width="80" height="24" />
            </ContentLoader>
            : <>
                <div className={styles.favorite} onClick={onClickFavorite}>
                    <img src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"}
                    alt="heart"/>
                </div>
                <img width={133} height={112} src={imageUrl} alt="sneakers"></img>
                <h5>{title}</h5>
                <div className="d-flex justify-between align-center">
                    <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price}</b>
                    </div>
                    <img
                        className={styles.plus}
                        width={30} height={30}
                        src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/plus.svg"}
                        alt="plus"
                        onClick={onClickPlus}>
                    </img>
                </div>
            </>}
        </div>
    );
}

export default Card

