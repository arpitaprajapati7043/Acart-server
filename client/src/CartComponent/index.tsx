import React, { useEffect, useState } from 'react'
import { Container, Row,Button } from 'react-bootstrap'



import axios from 'axios';
import ProductCard from '../ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutActionCreator, clearCartActionCreator } from '../reducers/userReducer';

const instance = axios.create({ baseURL: '/cart', withCredentials: true });


interface IRating {
    rate: number,
    count: number
}

interface IProduct {
    readonly id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: IRating,
    quantity: number,
};

interface IResponse {
    success: boolean;
    message: string,
    data: {
        cart: IProduct[],
        totalValue: Number;
    }
}

function CartComponent() {
    const dispatch = useDispatch();
    const { totalValue, cart } = useSelector(({ user }) => user);

    const url = 'getCart';
    const [products, setProducts] = useState<IProduct[]>([]);


    // useEffect(() => {
    //     // IIFE
    //     (async () => {
    //         const response = (await instance.get<IResponse>(url)).data;
    //         console.log(response.message);
    //         setProducts(response.data.cart);
    //     })();
    // }, []);

    useEffect(() => {
        (async () => {
            try {
                const response = await instance.get<IResponse>(url);
                console.log(response.data.message);
                setProducts(response.data.data.cart);
            } catch (error) {
                console.error('Error:', error);
            }
        })();
    }, []);
    

    // useEffect(()=>{
    //     setProducts(cart);
    // },[cart])

    useEffect(() => {
        if (cart.length > 0 && JSON.stringify(products) !== JSON.stringify(cart)) {
            setProducts(cart);
        }
    }, [cart, products]);
    

    const checkout = ()=>{
        dispatch<any>(checkoutActionCreator())
    }
    const clear = ()=>{
        dispatch<any>(clearCartActionCreator())
    }

    return (
        <Container fluid>
            <>
                <Row>
                    {products.map(item => <ProductCard key={item.id} {...item} />)}
                </Row>
                Total Value - {totalValue.toFixed(2)}
                <div className='d-flex justity-content-between'>
                    <Button variant='outline-primary' onClick={checkout}>Checkout</Button>
                    <Button variant='outline-danger' onClick={clear}>Clear cart</Button>
                </div>
            </>
        </Container>)
}

export default CartComponent