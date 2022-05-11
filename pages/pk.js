import { useMoralis, useWeb3Transfer } from "react-moralis";
import { useState,useEffect } from 'react'
import { Modal, Input, Image , Tooltip, Text, Grid, Card, Row } from "@nextui-org/react";
import Notiflix from 'notiflix';

import axios from "axios";

function Pk() {
    const {Moralis, authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();
    const [ItemShop, setItemShop] = useState(null);
    const [value, setValue] = useState("0.1");
    const [AddressSell, setAddressSell] = useState(null);

    const { fetch, error , isFetching } = useWeb3Transfer({
        amount: Moralis.Units.ETH(value),
        receiver: AddressSell,
        type: "native",
      });

    function buyItemShop(id,price,idItem,address,addresssell,idUser) {
        setAddressSell(addresssell)
        if(addresssell != address){
            setValue(price)
            apiAddItemUser(idItem,address)
            DelItemShop(id)
            DelSellShop(idUser)
            fetch({
              onSuccess: () => {
                  Notiflix.Notify.success('Mua thành công!');
        
              },
              onError: () => {
                Notiflix.Notify.failure('Mua thất bại! Vui lòng đăng nhập lại');
              }
            });
        }else{
            Notiflix.Notify.failure('Bạn không thể mua vật phẩm của chính mình');
        }
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

      function DelItemShop(id){
        axios.post('http://localhost:8000/api/delShop', {
          id: id
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }

      function DelSellShop(id){
        axios.post('http://localhost:8000/api/delSell', {
          id: id
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      
    useEffect(() => {
        axios.get('http://localhost:8000/api/shop').then(response => {
            setItemShop(response.data.item);
        });
      }, [])

    return ( 
        <div className="text-center card-center-body">
        {isAuthenticated ? (
          <Grid.Container gap={2} justify="flex-start">
              {!ItemShop ? null : ItemShop.map((item,index) =>
                    <Grid xs={6} sm={2} key={index}>
                        <Card clickable className="bg-dark-2">
                            <Image
                            className="image-item-shop p2"
                              src={item.image}
                              alt={item.name}
                              margin={10}
                            />
                          <Card.Footer justify="flex-start">
                            <Row wrap="wrap" justify="space-between">
                              <Text b color="white">{item.name}</Text>
                              <Text css={{ color: "$accents4", fontWeight: "$semibold" }}>
                                {item.price} BNB
                              </Text>
                              <Text b color="white" className="mt-2">Địa chỉ ví bán: </Text>
                              <Tooltip content={item.address}>
                                <Text b color="white" className="address-long">{item.address}</Text>
                              </Tooltip>
                              <button className="btn-buy-item btn btn-dark w-100 mt-4" onClick={() => buyItemShop(item.id,item.price,item.idItem,account,item.address,item.idUser)} disabled={isFetching}>Mua vật phẩm</button>
                            </Row>
                          </Card.Footer>
                        </Card>
                      </Grid>
                )}
          </Grid.Container>
        ) : (
        <div>
            <a href="javascript::void(0)" className="btn-connect-vi" onClick={() => authenticate({})} />
        </div>
        )}
        </div>
    );
}
  
export default Pk;