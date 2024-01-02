import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import user from "../img/user.png";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Username, setUsername] = useState("");

  useEffect(() => {
    async function fetchUser() {
      let apiUrl = process.env.REACT_APP_API_URL;

      const res = await fetch(apiUrl + "/getnotes", {
        credentials: "include",
      });
      const data = await res.json();
      // console.log(data);
      if (data.errors) {
        navigate("/");
      } else {
        var username = data.email.split("@")[0];
        username = username.charAt(0).toUpperCase() + username.slice(1);
        setUsername(username);
        setEmail(data.email);
      }
    }
    fetchUser();
  }, [Email, navigate]);

  return (
    <div className="px-5 lg:px-12 font-roboto flex flex-col">
      <Header></Header>
      <div>
        <div className="px-2 flex-col">
          <div className="text-head font-medium text-base lg:text-lg py-2">
            Hello,
          </div>
          <div className="text-2xl lg:text-4xl font-head font-semibold">
            {Username}
          </div>
        </div>
        <div className="py-3 lg:py-4">
          <div className="text-lg lg:text-2xl text-head font-roboto font-semibold px-2">
            Profile
          </div>
        </div>
      </div>
      <div className="block lg:flex">
        <div className="bg-white lg:ml-2 rounded-xl px-3 py-2 ">
          <div className="w-20 h-20 pt-6 pb-20 mx-auto">
            <img src={user} alt="" className="" />
          </div>
          <div className="font-bold font-roboto texl-lg px-3 py-3">Email</div>
          <div className="text-head text-xl font-bold px-3 pb-2">{Email}</div>
          <div className="block lg:flex">
            <Link to="/notes">
              <button className="text-head bg-faintBlue rounded-full font-roboto text-sm lg:text-base px-2 py-2 flex items-center  my-3 mx-4">
                <span className="material-icons pr-2">sticky_note_2</span>Your
                Notes
              </button>
            </Link>
            <Link to="/createnotes">
              <button className="text-head bg-faintBlue rounded-full font-roboto text-sm lg:text-base px-2 py-2 flex items-center  my-3 mx-4">
                <span className="material-icons pr-2">add_circle_outline</span>
                Create New Note
              </button>
            </Link>
          </div>
        </div>
        <div className="bg-white my-4 px-4 lg:w-96 lg:ml-40 rounded-xl lg:px-8 py-2">
          <div className="text-2xl font-head font-semibold py-4 mx-auto">
            About Notes pRO
          </div>
          <div className="justify-evenly font-roboto">
            Notes pRO is the note-taking app. The feature of the app is that
            Notes are saved on Cloud. So, you can access your notes from
            anywhere. You only need a Account on the Notes pRO. And you can
            create your notes and access them on the go.
          </div>
        </div>
      </div>
      <div className="pb-2 lg:absolute lg:left-1/2 lg:bottom-5">
        <Footer></Footer>
      </div>
    </div>
  );
}
