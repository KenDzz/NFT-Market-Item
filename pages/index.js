import { useMoralis, useWeb3Transfer } from "react-moralis";
import content from '../item.content';
import { useState } from 'react'
import Notiflix from 'notiflix';

export default function Home() {
  const {Moralis, authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();
  const [value, setValue] = useState("0.1");

  const { fetch, error , isFetching } = useWeb3Transfer({
    amount: Moralis.Units.ETH(value),
    receiver: process.env.NEXT_PUBLIC_ADRESS_BNB,
    type: "native",
  });

  function buyItemShop(price) {
    setValue(price);
    fetch({
      onSuccess: () => {
          Notiflix.Notify.success('Mua thành công!');

      },
      onError: () => {
        Notiflix.Notify.failure('Mua thất bại!');
      }
    });
  }

  return ( 
      <div className="text-center card-center-body">
      {isAuthenticated ? (
        <div>
          <p className="address-bnb"> Address: {account}</p>
          <button className="px-4 py-2 text-center btn btn-secondary" onClick={logout}>Logout Wallet width Metamask</button>
          <div className="item-shop row mt-4">
            {content.item.map(page =>
                <div className="col-3 mt-4">
                  <div className="card p-4">
                    <img src={page.path} className="image-item-shop"/>
                    <p className="title-item-shop">{page.title}</p>
                    <p className="price-item-shop">{page.price} BNB</p>
                    <button className="btn-buy-item btn btn-dark" onClick={() => buyItemShop(page.price)} disabled={isFetching}>Mua vật phẩm</button>
                  </div>
                </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <button className="px-4 py-2 btn-lg text-center btn btn-outline-secondary text-center" onClick={() => authenticate({})}>Connect Wallet</button>
        </div>
      )}
      </div>
  );

}
