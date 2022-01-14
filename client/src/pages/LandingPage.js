import React, {useState} from 'react'
import Footer from '../components/Footer'
import LoginForm from '../components/Login'
import SignupForm from '../components/Signup'
import Vector from '../img/Checklist.jpg'

export default function LandingPage() {

    const [Login, setLogin] = useState(true);
    const [Signup, setSignup] = useState(false);

    const handleDisplayLoginForm = () => {
        if(Login === false || Signup === true) {
            setSignup(false);
            setLogin(true);
        }
    }

    const handleDisplaySignupForm = () => {
        if(Login === true || Signup === false) {
            setSignup(true);
            setLogin(false);
        }
    }

    return (
        <div className='flex-col '>
            <div className="navbar bg-white px-3 lg:px-6 py-3 flex items-center w-screen">
                <div className='font-head font-semibold text-2xl text-center text-head  lg:mr-96'>Notes pRO</div>
                <div className='lg:ml-96 flex'>
                    <div className="cursor-pointer login ml-12 mr-1 lg:ml-96 lg:mr-2 px-3 py-1 font-roboto font-semibold bg-yellow-400 text-white rounded-full" onClick={handleDisplayLoginForm}>Login</div>
                    <div className="cursor-pointer signup ml-2 px-3 py-1 font-roboto font-semibold bg-yellow-400 text-white rounded-full" onClick={handleDisplaySignupForm}>Sign Up</div>
                </div>
            </div>
            <div className='body flex'>
                <div className="image hidden lg:block lg:w-7/12 lg:p-16 "><img src={Vector} alt="" className='rounded-xl overflow-clip'/></div>
                <div className="joinform w-screen lg:w-fit">
                    {Login && <LoginForm/>} 
                    {Signup && <SignupForm/>} 
                </div>
            </div>
            <div className="footer ">
                <Footer></Footer>
            </div>
        </div>
    )
}
