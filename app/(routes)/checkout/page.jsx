"use client"
import Header from '@/app/_components/Header'
import globalApi from '@/app/_utils/globalApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { ArrowBigRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const CheckoutPage = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const jwt = sessionStorage.getItem('jwt')
    const [totalCartItem, setTotalCartItem] = useState(0);
    const [cartItemList, setCartItemList] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const router = useRouter();

    const [username, setUsername] = useState();
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [zip, setZip] = useState()
    const [address, setAddress] = useState()
    const [totalAmount, setTotalAmount] = useState(0);
    const getCartItems = async () => {
        const cartItemList_ = await globalApi.getCartItems(user?.id, jwt);
        // console.log(cartItemList_)
        setTotalCartItem(cartItemList_?.length);
        setCartItemList(cartItemList_)
    }

    useEffect(() => {
        if (!jwt) {
            router.push('/sign-in')
        }
        getCartItems();
    }, [])


    const calculateTotal = () => {
        let total = 0;
        cartItemList.forEach(element => {
            total += element.amount;
        });
        const calculatedTotal = (total * 0.9 + 15).toFixed(2);
        setSubTotal(total);
        setTotalAmount(calculatedTotal);
    };
    useEffect(() => {
        if (cartItemList.length > 0) {
            calculateTotal()
        }

    }, [cartItemList]) //when page will be render and cart item list

    const calculateTotalAmount = () => {
        const total = subTotal * 0.9 + 15;
        // setTotalAmount(total.toFixed(2))
        // console.log(total)   //97.8
        return total.toFixed(2);

    }

    console.log("catrItemList ", cartItemList)
    const onApprove = (data) => {
        console.log(data)

        const payLoad = {
            data: {
                // paymentId: (data.paymentId).toString(),
                totalOrderAmount: totalAmount,
                username: username,
                email: email,
                phone: phone,
                zip: zip,
                address: address,
                orderItemList: cartItemList?.map((curr) => {
                    return { product: curr?.product, price: curr?.amount, quantity: curr?.quantity }
                }),
                userId: user.id,
                orderDate: new Date()
            }
        }
        globalApi.createOrder(payLoad, jwt).then(resp => {
            console.log(resp);
            toast('Order Placed Successfully!')
            cartItemList.forEach((item, index) => {
                globalApi.deleteCartItem(item.id).then(res => {
                    console.log(res)
                })
            })
            setTotalCartItem(0)
            router.replace('/order-confirmation')
        })
    }




    return (<>
        <Header />
        <div className='flex flex-col gap-10 w-full items-center'>
            <h1 className='bg-primary w-full p-3 text-white font-bold text-center text-2xl'>Checkout</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 w-[90%] pl-20 gap-20'>
                <div className='flex flex-col gap-4 w-[95%]'>
                    <h1 className='text-2xl font-bold '>Billing Details</h1>
                    <div className='flex flex-col gap-4'>
                        <div className='flex gap-8 w-full'>
                            <Input placeholder="Name" onChange={(e) => setUsername(e.target.value)} />
                            <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='flex gap-8 w-full'>
                            <Input placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
                            <Input placeholder="Zip" onChange={(e) => setZip(e.target.value)} />
                        </div>
                        <Input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
                    </div>
                </div>
                <div className='flex flex-col justify-center gap-2 bg-gray-100 w-1/2 p-5 border-[1px] rounded-sm shadow-sm'>

                    <h1 className='w-full bg-gray-300 h-[35px] text-center'>Total cart({totalCartItem})</h1>
                    <div className='flex flex-col gap-4'>
                        <h2 className='flex justify-between font-bold'>Subtotal: <span>${subTotal}</span></h2>
                        <div className='flex justify-between'>
                            <h2>Delivery: </h2>
                            <h2>$15</h2>
                        </div>
                        <div className='flex justify-between'>
                            <h2>Tax(9%):                        </h2>
                            <h2>${(totalCartItem * 0.9).toFixed(2)}</h2>
                        </div>
                        <h2 className='flex justify-between font-bold'>Total: <span>${calculateTotalAmount()}</span></h2>
                    </div>
                    <Button onClick={() => onApprove()}>Order Now <ArrowBigRight /></Button>
                    {/* <PayPalButtons className='mt-2' style={{ layout: "horizontal" }} 
                        forceReRender={[totalAmount]}
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: totalAmount,//pass the amount here
                                            currency_code: 'USD'// change the currency code if needed
                                        }
                                    }
                                ]
                            })

                        }}
                    /> */}
                </div>
            </div>
        </div >
    </>)
}

export default CheckoutPage