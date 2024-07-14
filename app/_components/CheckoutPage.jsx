import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

const CheckoutPage = () => {
    return (
        <div className='flex flex-col gap-10 w-full items-center'>
            <h1 className='bg-primary w-full p-3 text-white font-bold text-center text-2xl'>Checkout</h1>
            <div className='grid grid-cols-2 gap-28'>
                <div className='flex flex-col gap-4'>
                    <h1 className='text-2xl font-bold '>Billing Details</h1>
                    <div className='flex flex-col gap-4'>
                        <div className='flex gap-8'>
                            <Input type="text" placeholder="Name" />
                            <Input type="email" placeholder="Email" />
                        </div>
                        <div className='flex gap-2'>
                            <Input type="number" placeholder="Phone" />
                            <Input type="number" placeholder="Zip" />
                        </div>
                        <Input type="text" placeholder="Address" />
                    </div>
                </div>
                <div className='flex flex-col items-center gap-2 bg-gray-100 w-2/3'>

                    <h1>Total cart(6)</h1>
                    <div className='flex flex-col gap-2'>
                        <h2 className='flex justify-between'>Subtotal: <span>$4</span></h2>
                        <div className='flex justify-between'>
                            <h2>Delivery: </h2>
                            <h2>$15</h2>
                        </div>
                        <div className='flex justify-between'>
                            <h2>Tax(9%):</h2>
                            <h2> $5</h2>
                        </div>
                        <h2>Total: <span>$8</span></h2>
                    </div>
                    <div>
                        <Button>Payment</Button>
                        <div>
                            <Button>PayPal</Button>
                            <Button>PayLater</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage