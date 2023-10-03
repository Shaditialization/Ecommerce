import axios from 'axios';
import { createContext, useEffect, useState } from 'react';


export let CartContext = createContext();

let userToken = localStorage.getItem('userToken');
let headers = {
    token:userToken
}

function addToCart(id) {
    return axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
            productId:id
        },
        {
            headers
        }).then((response) => response)
        .catch((error)=>error)
}

function getLoggedUserCart() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers:headers
    })
    .then((response) => response)
    .catch((err)=>err)
}

function removeCartItem(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers })
    .then((response)=>response)
    .catch((error)=> error)
}

function updateProductQuantity(productId, count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count }, { headers })
        .then((response) => response)
        .catch((err)=>err)
}


function onlinePayment(cartId, url , values) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        {
            shippingAddress: values
        }, { headers })
        .then((response) => response)
        .catch((err) => err);
}

export default function CartContextProvider(props) {


    let [cartNums , setCartNums] = useState(0)


    const [cartId, setcartId] = useState(null);

    async function getCart() {
        let {data} = await getLoggedUserCart();
        setcartId(data?.data._id);
        console.log(data?.data._id);
    }

    useEffect(() => {
        console.log('sadsa');
        getCart();
    }, []);
    
    return <CartContext.Provider value={{ cartId , addToCart , onlinePayment , getLoggedUserCart , removeCartItem , updateProductQuantity,cartNums , setCartNums}}>
        {props.children}
    </CartContext.Provider>
}




