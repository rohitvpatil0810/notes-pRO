import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Vector from "../img/2840443.jpg";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateNotes({ setToast }) {
  const location = useLocation();
  const { from } = location.state;
  const navigate = useNavigate();
  const [title, settitle] = useState("");
  const [Titleerror, setTitleerror] = useState("");
  const [desc, setdesc] = useState("");
  const [Descerror, setDescerror] = useState("");
  const [Loading, setLoading] = useState("Update");
  const [Symbol, setSymbol] = useState("mode_edit");

  useEffect(() => {
    async function fetchNote() {
      const res = await fetch(`/note/${from}`, {
        credentials: "include",
      });
      const note = await res.json();
      if (res.status === 401) {
        navigate("/");
      } else {
        settitle(note.note.title);
        setdesc(note.note.desc);
      }
    }
    fetchNote();
  }, [navigate, from]);

  const updatenote = async (e) => {
    e.preventDefault();
    setSymbol("hourglass_empty");
    setLoading("Loading");

    const res = await fetch(`/updatenote/${from}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        desc,
      }),
      credentials: "include",
    });
    const data = await res.json();
    if (data.errors) {
      if (data.errors.error) {
        navigate("/");
      } else {
        setTitleerror(data.errors.title);
        setDescerror(data.errors.desc);
        setLoading("Update");
        setSymbol("mode_edit");
      }
    } else {
      setToast(2);
      navigate("/notes");
    }
  };

  return (
    <div>
      <div className="px-5 lg:px-12 font-roboto flex flex-col">
        <Header></Header>
        <div className="text-lg lg:text-2xl text-head font-roboto font-semibold px-2">
          Update Your Note
        </div>
        <div className="block lg:flex">
          <div className="bg-white font-bold my-3 lg:my-6 rounded-xl lg:w-5/12 lg:mr-auto">
            <form
              onSubmit={updatenote}
              className="flex flex-col px-3 lg:px-10 py-4 text-base lg:text-lg"
            >
              <label htmlFor="title" className="py-0 font-roboto my-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => settitle(e.target.value)}
                className="border-2 border-gray-400 rounded-xl px-6 py-1 "
              />
              <span className="text-sm text-red-500 px-3">{Titleerror} </span>
              <label htmlFor="desc" className="py-0 font-roboto my-1">
                Description
              </label>
              <textarea
                name="desc"
                id="desc"
                rows={7}
                value={desc}
                onChange={(e) => setdesc(e.target.value)}
                placeholder="Add your Description Here"
                className="border-2 font-robotos border-gray-400 rounded-xl px-6 py-3 "
              ></textarea>
              <span className="text-sm text-red-500 px-3">{Descerror} </span>
              <button className="text-head bg-faintBlue rounded-full font-roboto text-base px-2 py-2 flex items-center w-28 my-3">
                {" "}
                <span className="material-icons pr-2">{Symbol}</span>
                {Loading}
              </button>
            </form>
          </div>
          <div className="hidden lg:block lg:bg-white lg:w-5/12 lg:mx-auto lg:rounded-full">
            <img src={Vector} className="rounded-xl overflow-clip" />
          </div>
        </div>
        <div className="block pt-6 lg:absolute lg:left-1/2 lg:bottom-5">
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
}
