"use client"
import globalApi from '@/app/_utils/globalApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader, LoaderIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const SignIn = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const router = useRouter();
    const [loader, setLoader] = useState();
    useEffect(() => {
        const jwt = sessionStorage.getItem('jwt');
        if (jwt) {
            router.push('/');
        }
    }, [])
    const onSignIn = async () => {
        try {
            setLoader(true)
            const res = await globalApi.signIn(email, password);
            console.log(res?.data?.user);
            console.log(res?.data?.jwt);
            sessionStorage.setItem('user', JSON.stringify(res?.data?.user));
            sessionStorage.setItem('jwt', res?.data?.jwt);

            toast("Login successfull");
            router.push('/');
            setLoader(false)
        } catch (e) {
            console.error('Error while Signing In:', e);
            toast(e?.response?.data?.error?.message);
            setLoader(false)
        }
    }
    return (
        <>
            <div className='flex flex-col items-center justify-center mt-24 '>
                <div className='flex flex-col items-center gap-1 bg-slate-100 border border-gray-200 p-10'>
                    <div className='flex flex-row items-center'><Image src="/shopping-bag.png" alt='bag' width={70} height={50} /> <h1 className='flex flex-col leading-7 text-4xl font-bold  text-[#CD7A3D] '>Grocery<span className='text-[#4C9B6D]'>Store</span></h1>
                    </div>
                    <h2 className='font-bold text-3xl'>Sign In to Account</h2>
                    <h2 className='text-gray-600'>Enter your Email and Password to Sign In Account</h2>
                    <div className='w-full flex flex-col gap-5 mt-4 '>
                        <Input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="name@example.com" />
                        <Input onChange={(e) => setPassword(e.target.value)} type="Password" placeholder="Password" />
                        <Button
                            onClick={() => onSignIn()} >
                            {loader ? <LoaderIcon className='animate-spin' /> : 'Sign In'}</Button>
                    </div>

                    <p className='mt-4'>New User? <Link href={'/create-account'} className='text-blue-500'>Click here to Create Account</Link></p>
                </div>
            </div>
        </>
    )
}

export default SignIn