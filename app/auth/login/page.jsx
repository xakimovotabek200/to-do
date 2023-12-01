"use client"

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input } from 'antd';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import hands from '../../Image/hands.png';
import stiker from '../../Image/sticker.png';

const Login = () => {
    const router = useRouter();
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let { email, password } = e.target;

        try {
            const response = await axios.post('http://192.168.1.195:4000/auth/login/', {
                email: email.value,
                password: password.value,
            });

            const token = response.data.token;
            sessionStorage.setItem('token', token);
            console.log('Login successful', response.data);

            router.replace('/');
        } catch (error) {
            console.error('Login failed', error);
            setError('Invalid email or password. Please try again.'); // Set the error state
        }
    };

    return (
        <div>
            <div className="absolute inset-0 grid place-items-center">
                <div className="md:w-1/5 border-2 p-5 rounded-md">
                    <div className="text-center text-black text-2xl font-semibold mb-2 font-['Inria Serif']">
                        Welcome back !
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Email:
                            <Input className="mb-5" type="email" name="email" />
                        </label>
                        <br />
                        <label>
                            Password:
                            <Input.Password
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                className="mb-5"
                                type="password"
                                name="password"
                            />
                        </label>
                        <br />
                        <Button type="primary" htmlType="submit" className="bg-blue-500 w-full mt-2">
                            Sign In
                        </Button>
                    </form>
                    {error && <div className="text-red-500 mt-2">{error}</div>} {/* Display error message */}
                    <div className="mt-2 text-center">
                        Don’t have an account?
                        <Link href="/auth/register" className="underline hover:text-blue-500 duration-300">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hidden md:block absolute top-10 left-[1000px]">
                <Image className="w-[300px] h-[300px]" src={stiker} alt="" />
            </div>
            <div className="hidden md:block absolute bottom-0 left-[120px]">
                <Image className="w-[250px] h-[200px] object-cover" src={hands} alt="" />
            </div>
        </div>
    );
};

export default Login;
