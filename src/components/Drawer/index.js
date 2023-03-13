import React from 'react';
import axios from 'axios';

import Info from '../Info';
import {useCart} from '../../hooks/useCart';

import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({onClose, onRemove, items = [], opened}) {
  const {cartItems, setCartItems, totalPrice} = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const {data} = await axios.post('https://63bfca3a0cc56e5fb0df1297.mockapi.io/orders', {
        items: cartItems,
      });
      setOrderId(data.id)
      setIsOrderComplete(true);
      setCartItems([]);

      for(let i = 0; i < cartItems.length; i++ ) {
        const item = cartItems[i];
        await axios.delete('https://63bd1fa4d6600623889ac2b0.mockapi.io/cart/' + item.id);
        await delay(1000);
      }
    }
    catch (error) {
      alert('Не удалось создать заказ :(');
    }  
    setIsLoading(false);
  };

    return (
     <div className={`${styles.overlay} ${opened ? styles.overLayVisible : ''}`} > 
        <div className={styles.drawer}>
        <h2 className={styles.h2}>Корзина
          <img onClick={onClose} className="removeBtn cu-p" src="/img/btn-remove.svg" alt="Close"/>
        </h2>
      {items.length > 0 ?  
      <><div className="cart-items">
            {items.map((obj) => (
              <><div key={obj.id} className="cartItem d-flex align-center p-20 mb-20">
                <img className="mr-20 sneaker" width={70} height={70} src={obj.imageUrl} alt="Sneakers" />
                <div className="mr-20">
                  <p className="mb-5">{obj.title}</p>
                  <b>{obj.price} руб.</b>
                </div>
                <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="Revove" />
              </div></>
            ))}
            </div>
                <div className="cartTotalBlock">
                  <ul>
                    <li>
                      <span>Итого: </span>
                      <div></div>
                      <b>{totalPrice} руб. </b>
                    </li>
                    <li>
                      <span>Налог 5%: </span>
                      <div></div>
                      <b>{totalPrice / 100 * 5} руб. </b>
                    </li>
                  </ul>
                  <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформить заказ</button>
                </div></> : 
                <Info title={isOrderComplete ? "Заказ оформлен!" : "Корзина пуста"} 
                      description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ." }
                      image={isOrderComplete ? "/img/complete-order.png" : "/img/empty-cart.png"}
                      />
      }
      </div>
     </div> 
    )
}

export default Drawer