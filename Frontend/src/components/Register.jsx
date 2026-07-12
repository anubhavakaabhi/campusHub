import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleRegister } from '../services/auth.services.js'

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await handleRegister({ name, email, password });
        if (response.status === 200) {
            navigate('/');
        } else {
            alert(response.data.message);
        }
        setName('');
        setEmail('');
        setPassword('');
    }

    return (
        <div className='flex mt-30 justify-center items-center'>
            <div className="w-80 h-96 bg-white rounded-xl flex justify-center items-center flex-col gap-5">
                <div className='text-2xl font-bold'>Register</div>
                <form action="" onSubmit={handleSubmit} className='flex flex-col gap-5'>
                    <input id='name' type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} className='border-2 border-gray-300 rounded-md px-2 py-2 w-64 focus:outline-none focus:border-red-500' />
                    <input id='email' type="email" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} className='border-2 border-gray-300 rounded-md px-2 py-2 w-64 focus:outline-none focus:border-red-500' />
                    <input id='password' type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} className='border-2 border-gray-300 rounded-md px-2 py-2 w-64 focus:outline-none focus:border-red-500' />
                    <button type="submit" className='bg-red-500 text-white px-2 py-2 w-64 rounded-md hover:bg-red-600 transition duration-300 cursor-pointer'>Register</button>
                    <p>Already have an account? <Link to="/login" className='text-red-500 hover:text-red-600 transition duration-300 cursor-pointer'>Login</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Register