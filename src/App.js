import React, { createContext, useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom'
import axios from 'axios';

import Home from "./pages/Home";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

export const AppContext = createContext({});

function App() {
  const [cartOpened, setCartOpened] = useState(false);
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('https://638da7a44190defdb749613f.mockapi.io/cart'),
          axios.get('https://638da7a44190defdb749613f.mockapi.io/favorites'),
          axios.get('https://638da7a44190defdb749613f.mockapi.io/items'),
        ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch(error) {
        alert('Ошибка при запросе данных');
      }
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://638da7a44190defdb749613f.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post('https://638da7a44190defdb749613f.mockapi.io/cart', obj);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
      console.error(error);
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://638da7a44190defdb749613f.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Ошибка при удалении из корзины');
      console.error(error);
    }
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://638da7a44190defdb749613f.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post(
          'https://638da7a44190defdb749613f.mockapi.io/favorites',
          obj,
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в закладки');
      console.error(error);
    }
}

  const onChangeInputSearch = (event) => {
    setSearchValue(event.target.value);
  }

  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.parentId) === Number(id));
  }


  return (
    <AppContext.Provider value={{
      items,
      cartItems,
      favorites,
      isItemAdded,
      onAddToFavorite,
      setCartOpened,
      setCartItems,
      onAddToCart
      }}>

      <div className="wrapper clear">

      <Drawer
          items={cartItems}
          onCloseCart={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />
       
        <Header onClickCart={() => setCartOpened(true)}/>

        <Routes>
          <Route path="/favorites" element={<Favorites/>}></Route>

          <Route path="/orders" element={<Orders/>}></Route>

          <Route path="/" element={<Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeInputSearch={onChangeInputSearch}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
          />} exact>
          </Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;