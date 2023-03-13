import React from 'react'
import AppContext from '../context';

const Info = ({image, title, description}) => {

  const {setCartOpened} = React.useContext(AppContext);

  return (
         <div class="cartEmpty d-flex align-center justify-center flex-column flex">
                  <img 
                    className="mb-20" 
                    
                    height="120px" 
                    src={image}
                    alt="Empty"/>
                  <h2>{title}</h2>
                  <p className="opacity-6">{description}</p>
                  <button onClick={() => setCartOpened(false)} className="greenButton">
                    Вернуться назад
                  </button>
                </div>
  )
}

export default Info;