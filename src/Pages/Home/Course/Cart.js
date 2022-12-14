import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddItem, DecreaseOne, deleteItem } from '../../Redux/CourseSlice';

const Cart = () => {


    const dispatch = useDispatch();
    const [price, setPrice] = useState(0);
    const carts = useSelector((state) => state.CourseReducer.carts);


    const AddToCart = (course) => {
        dispatch(AddItem(course));

    }

    // remove one
    const Decrease = (item) => {
        dispatch(DecreaseOne(item))
    }

    const dlt = (id) => {
        //console.log(pid);
        dispatch(deleteItem(id))
    }

    const total = () => {
        let price = 0;
        carts.map((ele, k) => {
            price = ele.price * ele.quantity + price;
        });
        setPrice(price);
    };


    useEffect(() => {
        total()
    }, [total])

    return (
        <div className='px-3 my-10'>
            <p className='text-3xl text-center font-bold my-10'>Your Course items: {carts.length}</p>

            <section className='flex flex-col lg:flex-row gap-5 '>
                <div className='flex flex-col gap-5 lg:w-1/2'>
                    {
                        carts.map(cart => <div key={cart._id}>


                            <div className="card lg:w-3/4 mx-auto w-full bg-pink-100 shadow-xl lg:h-44 h-full flex flex-col lg:flex-row items-center gap-4 p-2">
                                <div className='lg:grow grow-0 w-full  flex justify-around items-center'>
                                    <figure className="px-2 pt-2">
                                        <img src={`${cart.image}`} alt="Shoes" className="rounded-xl lg:h-32 h-20" />
                                    </figure>

                                    <div className='flex flex-col'>
                                        <h2 className="card-title">{cart.name}</h2>
                                        <h2 className="">Price: {cart.price}$</h2>
                                        <p className="text-red-400 cursor-pointer" onClick={() => dlt(cart.bid)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-center">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                        </p>

                                    </div>
                                </div>

                                <div className='flex w-1/3 pr-2'>
                                    <p className='border-2 px-3 text-2xl cursor-pointer' onClick={cart.quantity <= 1 ? () => dlt(cart._id) : () => Decrease(cart)}>-</p>
                                    <p className='border-2 px-3 text-2xl '>{cart.quantity}</p>
                                    <p className='border-2 px-3 text-2xl cursor-pointer' onClick={() => AddToCart(cart)}>+</p>
                                </div>

                            </div>

                        </div>)
                    }
                </div>

                <div className='lg:w-1/2 '>
                    <div class="container sticky top-0 z-50">
                        <div className="card lg:w-3/5 w-full mx-auto ">
                            <div className="card-body p-2">
                                <p>Total:</p>
                                <h2 className="text-3xl font-bold">{price}$</h2>
                                <button className="btn btn-info  w-3/4 text-white ">Checkout</button>

                            </div>
                        </div>
                    </div>
                </div>
            </section >

        </div >
    );
};

export default Cart;