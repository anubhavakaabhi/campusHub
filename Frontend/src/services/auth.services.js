import axios from "axios";


async function handleLogin({email,password}){
    const response = await axios.post("http://localhost:3000/login",{
        email,
        password,
    },{withCredentials:true});
    return response;
}

async function handleRegister({name,email,password}){
    const response = await axios.post("http://localhost:3000/register",{
        name,
        email,
        password,
    },{withCredentials:true});
    return response;
}

export {handleLogin , handleRegister};