import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <div>
            <div className="navbar py-3 lg:py-8 flex justify-end lg:justify-between ">
                <div className="searchBox hidden rounded-full bg-white px-2 lg:mr-96 lg:flex lg:items-center">
                    <span className="material-icons px-2" >search</span>
                    <input type="text" name="search" id="search" className='border-none px-1 py-1 mr-3 w-80' />
                </div>
                <div className="profile flex items-center">
                    <span className="material-icons text-head bg-white text-2xl px-2 py-1 rounded-full lg:ml-60 ">notifications</span>
                    <Link to='/profile'><span className="material-icons mx-3 lg:mx-8 text-5xl text-head">account_circle</span></Link>
                </div>
            </div>
        </div>
    )
}
