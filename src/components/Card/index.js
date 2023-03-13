import React from 'react';
import ContentLoader from "react-content-loader"
import styles from './Card.module.scss';
import AppContext from '../../context';

function Card({ id, 
                onFavorite, 
                imageUrl, 
                title, 
                price, 
                onPlus, 
                favorited = false,  
                loading = false}) {
    const {isItemAdded} = React.useContext(AppContext);              
    const [isFavorite, setIsFavorite] = React.useState(favorited);
    const obj = {id, parentId: id, imageUrl, title, price};

    const onClickPlus = () => {
      onPlus(obj);
      
    }
    
    const onClickFavorite = () => {
      onFavorite(obj);
      setIsFavorite(!isFavorite);
      
    }

    return ( 
      <div className={styles.card}>
        { loading ? 
        <ContentLoader 
          speed={2}
          width={210}
          height={260}
          viewBox="0 0 210 260"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="25" rx="10" ry="10" width="150" height="91" /> 
          <rect x="0" y="131" rx="3" ry="3" width="150" height="15" /> 
          <rect x="0" y="151" rx="3" ry="3" width="93" height="15" /> 
          <rect x="0" y="188" rx="8" ry="8" width="80" height="24" /> 
          <rect x="118" y="180" rx="8" ry="8" width="32" height="32" />
        </ContentLoader>
        : <><div className={styles.favorite} onClick={onClickFavorite}>
              {onFavorite && (<img src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"} alt="Favorite"/>)}  
            </div>
            <img width={'100%'} height={135} src={imageUrl} alt="Sneakers"/>
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>{price} руб.</b>
              </div> 
                {onPlus && (
                <img 
                className={styles.plus} 
                onClick={onClickPlus} 
                src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} 
                alt="Plus"/>)}
            </div></>}
      </div>
    )
}

export default Card