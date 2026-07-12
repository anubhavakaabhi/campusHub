import { useState } from 'react';
import { handleLogin } from '../services/auth.services.js';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit=async (e) => {
        e.preventDefault();
        setEmail('');
        setPassword('');
        const response = await handleLogin({email,password});
        if(response.status === 200){
            navigate('/');
        }else{
            alert('Invalid credentials');
        }
    }

    return (
        <div className='flex mt-30 justify-center items-center'>
            <div className="w-80 h-96 bg-white rounded-xl flex justify-center items-center flex-col gap-5">
                <div className='text-2xl font-bold'>Login</div>
                <form action="" onSubmit={handleSubmit} className='flex flex-col gap-5'>
                    <input id='email' type="email" value={email} placeholder="email" onChange={(e)=>setEmail(e.target.value)} className='border-2 border-gray-300 rounded-md px-2 py-2 w-64 focus:outline-none focus:border-red-500' />
                    <input id='password' type="password" value={password} placeholder="Password" onChange={(e)=>setPassword(e.target.value)} className='border-2 border-gray-300 rounded-md px-2 py-2 w-64 focus:outline-none focus:border-red-500' />
                    <button type="submit" className='bg-red-500 text-white px-2 py-2 w-64 rounded-md hover:bg-red-600 transition duration-300 cursor-pointer'>Login</button>  
                </form>
                <p>Don't have an account? <Link to="/register" className='text-red-500 hover:text-red-600 transition duration-300 cursor-pointer'>Register</Link></p>
            </div>
        </div>
    )
}

export default Login