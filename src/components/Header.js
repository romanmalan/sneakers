import React from 'react'
import {Link} from 'react-router-dom';
import {useCart} from '../hooks/useCart'

function Header(props) {
    const {totalPrice, favorites} = useCart();
    
    return(
        <header className="d-flex justify-between align-center p-40">
      <div className="d-flex align-center">
       <Link to='/' exact>
        <img width={40} height={40} src="/img/logo.svg" alt="Logo" />
        <div className="headerInfo">
          <h3>REACT SNEAKERS</h3>
          <p>Магазин лучших кроссовок</p>
        </div>
       </Link>
      </div>  
      <ul className="d-flex"> 
        <li onClick={props.onClickCart} className="mr-30 cu-p"> 
          <img src="/img/cart.svg" width={18} height={18} alt="Корзина" />
          <span className="price"> {totalPrice} руб.</span>
        </li>
        <li>
          <Link to='/favorites'>
            <img className="cu-p mr-30" src="/img/heart.svg" width={18} height={18} alt="Закладки" />
            <div className='text-center mr-30'>{favorites.length}</div>
          </Link>
        </li>
        <li>
          <Link to='/orders'>
            <img src="img/user.svg" width={18} height={18} alt="Пользователь" />
          </Link>  
        </li>
      </ul>
     </header>
    )
}

export default Header