import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [Menu, setMenu] = useState('hidden');
  const navigator = useNavigate();
  const logout = async () => {
    console.log('logging out');
    const res = await fetch('/logout', {
      credentials: 'include'
    });
    // console.log(res);
    navigator('/');
    window.location.reload();
  }

  const handleExpand = () => {
    if(Menu === 'hidden'){
      setMenu('');
    }else{
      setMenu('hidden');
    }
  }

  return (
    <div className="bg-white w-full  lg:w-56 lg:h-screen">
      <div className="content flex-col py-4 lg:py-8">
      <div className="flex px-4 justify-between items-center lg:block">
        <Link to='/dashboard'>
          <div className="font-head font-semibold text-2xl text-center text-head">
          Notes pRO
          </div>
        </Link>
        <span onClick={handleExpand} className={`material-icons lg:hidden `}>menu</span>
        </div>
        <div className= {`px-10 py-4 ${Menu} lg:block`} >
          <ul className="py-4 text-roboto text-base font-semibold flex flex-col ">
            <Link to='/dashboard'>
              <li className="py-4 flex justify-end items-center">
                <div className="">Dashboard</div>
                <span className="material-icons px-2 text-gray-700">&#xe88a;</span>
              </li>
            </Link>
            {/* <li className="py-4 flex justify-end items-center">
              <div className="">Tasks</div>
              <span className="material-icons px-2 text-gray-700">&#xef6e;</span>
            </li> */}
            <Link to='/notes'>
              <li className="py-4 flex justify-end items-center">
                <div className="">Notes</div>
                <span className="material-icons px-2 text-gray-700">sticky_note_2</span>
              </li>
            </Link>
            {/* <li className="py-4 flex justify-end items-center">
              <div className="">Calendar</div>
              <span className="material-icons px-2 text-gray-700">&#xe878;</span>
            </li> */}
            <Link to='/createnotes'>
              <li className="py-4 flex justify-end items-center">
                <div className="">Create Notes</div>
                <span className="material-icons px-2 text-gray-700">drive_file_rename_outline</span>
              </li>
            </Link>
          </ul>
        <div onClick={logout} className="text-center w-fit mx-44 lg:mt-80 lg:mx-10 px-2 py-2 bg-faintBlue font-roboto text-head rounded-full cursor-pointer"><div className="flex items-center"><span className="material-icons px-1">logout</span>Logout</div></div>
        </div>
      </div>
    </div>
  );
}
