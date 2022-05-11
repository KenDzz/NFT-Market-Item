import { useMoralis, useWeb3Transfer } from "react-moralis";
import content from '../data/item.content';
import { useState,useEffect } from 'react'
import Notiflix from 'notiflix';
import axios from "axios";
import Cookies from 'js-cookie'


export default function Home() {
  const {Moralis, authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();
  const [value, setValue] = useState("0.1");
  const [Item, setItem] = useState(null);

  const { fetch, error , isFetching } = useWeb3Transfer({
    amount: Moralis.Units.ETH(value),
    receiver: process.env.NEXT_PUBLIC_ADRESS_BNB,
    type: "native",
  });

  function buyItemShop(price,id,address) {
    setValue(price);
    apiAddItemUser(id,address)
    fetch({
      onSuccess: () => {
          Notiflix.Notify.success('Mua thành công!');

      },
      onError: () => {
        Notiflix.Notify.failure('Mua thất bại! Vui lòng đăng nhập lại');
      }
    });
  }
  
  function apiAddItemUser(id,address){
    axios.post('http://localhost:8000/api/addItemAdress', {
      id: id,
      address: address
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  if(isAuthenticated){
    Cookies.set('address', account)
  }

  useEffect(() => {
    axios.get('http://localhost:8000/api/item').then(response => {
      setItem(response.data.item);
    });
  }, [])
  

  return ( 
      <div className="text-center card-center-body">
      {isAuthenticated ? (
        <div>
          <p className="address-bnb"> Address: {Cookies.get('address')}</p>
          <a  href="javascript::void(0)"  className="btn-out-vi" onClick={logout}/>
          <div className="item-shop row">
            {!Item ? null : Item.map(item =>
                <div className="col-3 mt-4">
                  <div className="card p-4">
                    <img src={item.image} className="image-item-shop"/>
                    <p className="title-item-shop">{item.name}</p>
                    <p className="price-item-shop">{item.price} BNB</p>
                    <button className="btn-buy-item btn btn-dark" onClick={() => buyItemShop(item.price,item.id,account)} disabled={isFetching}>Mua vật phẩm</button>
                  </div>
                </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <a href="javascript::void(0)" className="btn-connect-vi" onClick={() => authenticate({})} />
        </div>
      )}
      </div>
  );

}