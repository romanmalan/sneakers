import React from 'react';
import Card from '../components/Card' ;


function Home({
  searchValue, 
  setSearchValue, 
  onChangeSeachInput, 
  items, 
  onAddToFavorite, 
  onAddToCart, 
  isLoading
}) {

  const renderItems = () => {
    const filtredItems = items.filter((item) => 
      item.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    return (isLoading ? [...Array(8)] : filtredItems).map((item, index)=>(
          <Card key={index}
                onFavorite={(obj) => onAddToFavorite(obj)}
                onPlus={(obj) => onAddToCart(obj)}
                loading={isLoading}
                {...item}/>
     ))
  }

  return(
     <div className="content p-50">
       <div className="d-flex align-center justify-between pb-40">
         <h1 className="">{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1> 
         <div className="search-block">
            <img src="/img/search.svg" alt="Search"/>
            {searchValue && <img onClick={() => setSearchValue('')}className="clear cu-p" src="/img/btn-remove.svg" alt="Clear"/>}
            <input onChange={onChangeSeachInput} placeholder="Поиск" value={searchValue}/>
         </div>
       </div>
       <div className="cards">
         {renderItems()}
       </div>
     </div>
    );
}

export default Home;