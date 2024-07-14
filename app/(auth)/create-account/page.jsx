"use client"
import globalApi from '@/app/_utils/globalApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { LoaderIcon } from 'lucide-react'
const CreateAccount = () => {

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const router = useRouter();
    const [loader, setLoader] = useState()

    useEffect(() => {
        const jwt = sessionStorage.getItem('jwt');
        if (jwt) {
            router.push('/');
        }
    }, [])

    const onCreateAccount = async () => {
        try {
            setLoader(true);
            const res = await globalApi.registerUser(username, email, password);
            // console.log(res?.data?.user);
            // console.log(res?.data?.jwt);
            sessionStorage.setItem('user', JSON.stringify(res?.data?.user));
            sessionStorage.setItem('jwt', res?.data?.jwt);

            toast("Account created successfully");
            router.push('/');
            setLoader(false)
        } catch (error) {
            console.error('Error while creating account:', error);
            toast(error?.response?.data?.error?.message);
            setLoader(false)
        }
    }
    return (
        <>
            <div className='flex flex-col items-center justify-center mt-24 '>
                <div className='flex flex-col items-center gap-1 bg-slate-100 border border-gray-200 p-10'>
                    <div className='flex flex-row items-center'><Image src="/shopping-bag.png" alt='bag' width={70} height={50} /> <h1 className='flex flex-col leading-7 text-4xl font-bold  text-[#CD7A3D] '>Grocery<span className='text-[#4C9B6D]'>Store</span></h1>
                    </div>
                    <h2 className='font-bold text-3xl'>Create an Account</h2>
                    <h2 className='text-gray-600'>Enter your Email and Password to create an account</h2>
                    <div className='w-full flex flex-col gap-5 mt-4 '>
                        <Input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" />
                        <Input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="name@example.com" />
                        <Input onChange={(e) => setPassword(e.target.value)} type="Password" placeholder="Password" />
                        <Button onClick={() => onCreateAccount()}>
                            {loader ? <LoaderIcon className='animate-spin' /> : 'Create an Account'}</Button>
                    </div>

                    <p className='mt-4'>Already have an account? <Link href={'/sign-in'} className='text-blue-500'>Click here to Sign In</Link></p>
                </div>
            </div >
        </>
    )
}

export default CreateAccount