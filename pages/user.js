import { useMoralis} from "react-moralis";
import { useState,useEffect } from 'react';
import { Modal, Input, Image , Button, Text } from "@nextui-org/react";
import axios from "axios";
import Notiflix from 'notiflix';
import Cookies from 'js-cookie'

export default function User() {
    const {authenticate, isAuthenticated, account} = useMoralis();
    const [ItemBalo, setItemBalo] = useState(null);
    const [visible, setVisible] = useState(false);
    const [idItem, setIdItem] = useState(0);
    const [price, setPrice] = useState(0);
    const [id, setId] = useState(0);
    const [idSet, setIdSet] = useState(0);
    const [nameItem, setNameItem] = useState(null);
    const [ImageItem, setImageItem] = useState(null);
    const [ImageVk, setImageVk] = useState(null);
    const [ImageMu, setImageMu] = useState(null);
    const [ImageToc, setImageToc] = useState(null);
    const [ImageAo, setImageAo] = useState(null);
    const [type, settype] = useState(null);

    const closeHandler = () => {
      setVisible(false);
      console.log("closed");
    };

    function openModal(id,idItem,name,image){
        setId(id);
        setIdItem(idItem);
        setNameItem(name);
        setImageItem(image);
        setVisible(true);
    }

    function setBalo(id,image,type){
        settype(type)
        setIdSet(id)
        switch (type) {
            case 1:
                setImageVk(image);
                
                break;
            case 2:
                setImageMu(image);
                break;
            case 3:
                setImageToc(image);
                break;
            case 4:
                setImageAo(image);
                break;

            default:
                console.log("Error");
                break;
        }
        updateIsWear()
        setIsWear()
    }

    function updateIsWear(){
        axios.post('http://localhost:8000/api/updateIsWear', {
            address: account,
            type: type
        })
        .then(function (response) {
            console.log(response.data.result);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    function setIsWear(){
        axios.post('http://localhost:8000/api/setIsWear', {
            address: account,
            id: idSet
        })
        .then(function (response) {
            console.log(response.data.result);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    function sellItem(){
        axios.post('http://localhost:8000/api/sellItem', {
            id: id,
            idItem: idItem,
            address: account,
            price: price
        })
        .then(function (response) {
          if(response.data.result == "true"){
            setVisible(false);
            Notiflix.Notify.success('Đăng bán thành công!');
          }else{
            Notiflix.Notify.failure('Bán thất bại! Vui lòng thử lại sau');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }

    useEffect(() => {
        console.log(Cookies.get('address'))
        axios.post('http://localhost:8000/api/showItemBalo/', {
            address: Cookies.get('address')
          })
          .then(function (response) {
            setItemBalo(response.data.item)
            for (const item of response.data.item) {
                if(item.isWear > 0){
                    switch (item.type) {
                        case 1:
                            setImageVk(item.image);
                            break;
                        case 2:
                            setImageMu(item.image);
                            break;
                        case 3:
                            setImageToc(item.image);
                            break;
                        case 4:
                            setImageAo(item.image);
                            break;
            
                        default:
                            console.log("Error");
                            break;
                    }
                }
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }, [])

    return ( 
        <div className="text-center card-center-body">
        {isAuthenticated ? (
            <div className="character row">
                <div className="character-form col-6">
                    <div className="row p-4">
                            <div className="col-2 border bg-balo">
                                <span className="text-balo">Mũ</span>
                                <img src={!ImageMu ? "#"  : ImageMu} className="img-balo-mu"/>
                            </div>
                            <div className="col-2 border bg-balo">
                                <span className="text-balo">Tóc</span>
                                <img src={!ImageToc ? "#" : ImageToc} className="img-balo-toc"/>
                            </div>
                            <div className="col-2 border bg-balo">
                                <span className="text-balo">Áo</span>
                                <img src={!ImageAo ? "#"  : ImageAo} className="img-balo-ao"/>
                            </div>
                            <div className="col-2 border bg-balo">
                                <span className="text-balo">Vũ khí</span>
                                <img src={!ImageVk ? "#" : ImageVk} className="img-balo"/>
                            </div>
                    </div>
                </div>
                <div className="character-full-hd col-6">
                    <div className="island-character-1">
                        <div className="character-full-1">
                            <img src={!ImageMu ? 'http://res.gn.zing.vn/image/equip/f/head/default/1/show.png' : ImageMu} className="head-character-1"/>
                            <img src={!ImageToc ? 'http://res.gn.zing.vn/image/equip/f/hair/default/1/B/show.png' : ImageToc} className="hair-character-1"/>
                            <img src={!ImageAo ? 'http://res.gn.zing.vn/image/equip/f/cloth/default/1/show.png' : ImageAo} className="cloth-character-1"/>
                            <div className="face-character-1"></div>
                        </div>
                        <div className="name-character-1">
                            <h2></h2>
                        </div>
                        <img src="islands-1.png" className="island-1" />
                    </div>
                </div>
                <div className="item-shop row">
                    {!ItemBalo ? null : ItemBalo.map(item =>
                        // eslint-disable-next-line react/jsx-key
                        <div className="col-2 mt-4">
                            <div className="card p-4">
                            <img src={item.image} className="image-item-shop"/>
                            <p className="title-item-shop">{item.name}</p>
                            {item.isBind == 0 ? ( 
                                <div>
                                    <button className="btn-buy-item btn btn-dark w-100" onClick={() => setBalo(item.id,item.image,item.type)}>Đeo</button>
                                    <button className="btn-buy-item btn btn-dark w-100 mt-2" onClick={() => openModal(item.id,item.idItem,item.name,item.image)}>Bán</button>
                                </div>
                            ) : ( 
                                <div>
                                    <button className="btn-buy-item btn btn-dark">Hủy niêm yết</button>
                                </div>
                            )}
                            </div>
                        </div>
                    )}
                </div>
                <Modal
                    closeButton
                    blur
                    aria-labelledby="modal-title"
                    open={visible}
                    onClose={closeHandler}
                >
                    <Modal.Header>
                    <Text id="modal-title" size={18}>
                        Bán vật phẩm
                    </Text>
                    </Modal.Header>
                    <Modal.Body>
                    <Image 
                        src={ImageItem}
                        alt="Default Image"
                        objectFit="cover"
                    />
                    <Text id="modal-title" size={20} margin={5} p>
                        {nameItem}
                    </Text>
                    <Input
                        onChange={e => setPrice(e.target.value)}
                        type="number"
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Giá tiền (BNB)"
                    />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button auto flat color="error" onClick={closeHandler}>
                        Hủy
                    </Button>
                    <Button auto onClick={sellItem}>
                        Bán
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            ) : ( 
            <div>
                <a href="javascript::void(0)" className="btn-connect-vi" onClick={() => authenticate({})} />
            </div>
             )}
        </div>
    );
}