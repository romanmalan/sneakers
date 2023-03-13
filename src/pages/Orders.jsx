import React from 'react';
import Card from '../components/Card' ;
import axios from 'axios';
import AppContext from '../context';

function Orders() {
    const {onAddToFavorite, onAddToCart} = React.useContext(AppContext);
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
       (async() => {
        try {
          const {data} = await axios.get('https://63bfca3a0cc56e5fb0df1297.mockapi.io/orders');
       // console.log(data.map((obj) => obj.items).flat());
          setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
          setIsLoading(false);
        }
        catch (error) {
          alert('Ошибка при запросе заказов');
          console.error('Ошибка при запросе заказов');
        }
       })();
    }, []);
 
    return(
     <div className="content p-50">
       <div className="fav-title d-flex align-center justify-between pb-40">
         <h1>Мои заказы</h1> 
       </div>
       <div className="cards">
            {(isLoading ? [...Array(8)] : orders).map((item, index)=>(
                <Card
                  key={index}
                  loading={isLoading}
                  {...item} />
                ))}
       </div>
     </div>
    );
}

export default Orders;