import React from "react";

import Card from "../components/Card/index";

function Home({
  searchValue,
  onChangeInputSearch,
  setSearchValue,
  items,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) {

  const renderItems = () => {
    return (isLoading
       ? [...Array(8)] 
       : items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
       ).map((item, index) => (
        <Card
          key={index}
          onFavorite={(obj) => onAddToFavorite(obj)}
          onPlus={(obj) => onAddToCart(obj)}
          loading={isLoading}
          {...item}
        />
))
};

  return (
    
    <div className="content p-40">
    
        <div className="d-flex align-center justify-between mb-40">
          <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : "Все кроссовки"}</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="search"></img>
            <input onChange={onChangeInputSearch} value={searchValue} placeholder="Поиск..."/>
            {searchValue && 
                      <img
                        onClick={() => setSearchValue('')}
                        className="cu-p"
                        style={{width: "18px"}}
                        src="/img/btn-remove.svg"
                        alt="clear"/>}
          </div>
        </div>

        <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
}

export default Home