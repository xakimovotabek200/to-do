"use client";

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input } from 'antd';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import hands from "../../Image/hands.png";
import stiker from "../../Image/sticker.png";

const Register = () => {
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let { name, email, password } = e.target;
        try {
            const response = await axios.post('http://192.168.1.195:4000/auth/register/', {
                name: name.value,
                email: email.value,
                password: password.value,
            });

            const token = response.data.token;

            sessionStorage.setItem('token', token);

            console.log('Registration successful', response.data);

            router.replace('/');


            // window.location.reload(true);
            if (!sessionStorage.getItem('token')) {
                router.push('/');
            }
        } catch (error) {
            console.error('Registration failed', error);
        }
    };


    return (
        <div className="">
            <div className="absolute inset-0 grid place-items-center">
                <div className="w-11/12 md:w-1/5  border-2 p-5 rounded-md">
                    <div className=" text-center text-black text-2xl font-semibold mb-2 font-['Inria Serif']">
                        Hello there 👋 !
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">
                            Name:
                        </label>
                            <Input className="mb-5" type="text" id="name" name="name" />
                        <br />
                        <label htmlFor="email">
                            Email:
                        </label>
                            <Input className="mb-5" type="email" id="email" name="email" />
                        <br />
                        <label htmlFor="password">
                            Password:
                        </label>
                            <Input.Password
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                className="mb-5" type="password" id="password" name="password" />
                        <br />
                        <Button type="primary" htmlType='submit' className="bg-blue-500 w-full mt-2">
                            Sing Up
                        </Button>

                    </form>
                    <div className='mt-2 text-center'>
                        Already have an account?
                        <Link href="/auth/login" className="underline hover:text-blue-500 duration-300">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>


            <div className="hidden md:block absolute top-10 left-[1000px]">
                <Image className="w-[300px] h-[300px]" src={stiker} alt='' />
            </div>

            <div className="hidden md:block absolute bottom-0 left-[120px]">
                <Image className="w-[250px] h-[200px] object-cover" src={hands} alt='' />
            </div>
        </div>

    );
};

export default Register;
