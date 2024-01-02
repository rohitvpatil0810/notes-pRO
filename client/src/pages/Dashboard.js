import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Notescard from "../components/Notescard";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

export default function Dashboard({ setToast }) {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Notes, setNotes] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchNotes() {
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
        setEmail(username);
        if (data.notes.length > 0) {
          data.notes.length = 4;
        }
        setNotes(data.notes);
      }
    }
    fetchNotes();
    setLoading(false);
  }, [Email, Notes, navigate]);
  return (
    <div className="px-5 lg:px-12 font-roboto flex flex-col">
      <Header></Header>
      {Loading ? (
        <div className="flex items-center justify-center">
          <HashLoader loading={Loading} color={"#1A697A"} size={100} />
        </div>
      ) : (
        <div>
          <div className="px-2 flex-col">
            <div className="text-head font-medium text-base lg:text-lg py-2">
              Hello,
            </div>
            <div className="text-2xl lg:text-4xl font-head font-semibold">
              {Email}
            </div>
          </div>
          <div className="recent_notes py-3 lg:py-8">
            <div className="recent_notes text-lg lg:text-2xl text-head font-roboto font-semibold px-2">
              Recent Notes
            </div>
            <div className="flex flex-col justify-center items-center lg:grid lg:grid-cols-4 lg:gap-11">
              {Notes.length > 0 ? (
                Notes.map((note) => {
                  return (
                    <Notescard
                      key={note._id}
                      id={note._id}
                      title={note.title}
                      desc={note.desc}
                      setToast={setToast}
                    />
                  );
                })
              ) : (
                <div className="py-16 text-xl font-roboto font-bold text-head flex flex-col justify-center items-center">
                  <span className="material-icons text-6xl py-4 items-center">
                    info
                  </span>
                  <div>You have 0 Notes</div>
                  <Link to="/createnotes">
                    <button className="text-head bg-white rounded-full w-44 font-roboto text-base px-2 py-2 flex items-center  my-3 mx-4">
                      <span className="material-icons pr-2">
                        add_circle_outline
                      </span>
                      Create New Note
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="pb-2 lg:absolute lg:left-1/2 lg:bottom-5">
        <Footer></Footer>
      </div>
    </div>
  );
}
