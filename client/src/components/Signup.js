import React, { useState }  from 'react'
import { useNavigate } from 'react-router-dom';
import user from '../img/user.png'

export default function Signup() {

    const navigate = useNavigate();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Loading, setLoading] = useState('Signup');
    const [Emailerror, setEmailerror] = useState('');
    const [Passworderror, setPassworderror] = useState('')
    
    const updateEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    } 
    const updatePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    const signup = async (e) => {
        e.preventDefault();
        setLoading('Loading');
        const res = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                email: Email,
                password: Password
            })
        })
        
        const data = await res.json();
        if(data.errors){
            setEmailerror(data.errors.email);
            setPassworderror(data.errors.password);
            setLoading('Signup');
        }
        else{
            // console.log(data.errors);
            navigate('dashboard');
        }
        // window.alert(data);
        // console.log(data);
        // navigate('dashboard');
    }

    return (
        <div className='mx-4 my-8 lg:my-6 lg:px-14 lg:py-8 lg:ml-16'>
            <div className='flex flex-col items-center justify-center bg-white rounded-xl p-12 lg:w-full'>
                <div className='lg:py-3 text-4xl text-roboto text-bold text-head'>Sign Up</div>
                <div className="w-20 h-20 py-3"><img src={user} alt="" /></div>
                <form onSubmit={signup} className='flex flex-col justify-start lg:px-0 py-2 text-lg'>
                    <label htmlFor="email" className='justify-self-start py-3'>Email</label>
                    <input type="email" name="email" id="email" value={Email} onChange={updateEmail} className='border-2 border-gray-400 rounded-3xl px-6 py-1 lg:w-80' />
                    <span className='emailerror text-sm text-red-500 px-3'>{Emailerror} </span>
                    <label htmlFor="password" className='justify-self-start py-3'>Password</label>
                    <input type="password" name="password" id="password" value={Password} onChange={updatePassword} className='border-2 border-gray-400 rounded-3xl px-6 py-1' />
                    <span className='passworderror text-sm text-red-500 px-3'>{Passworderror}</span>
                    <button className='mt-10 px-2 py-2 bg-yellow-400 text-white font-bold w-24 rounded-full self-center'>{Loading}</button>
                </form>
                
            </div>
        </div>
    )
}
