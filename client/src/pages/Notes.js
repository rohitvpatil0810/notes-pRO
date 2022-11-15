import React, { useEffect, useState } from 'react'
import Notescard from '../components/Notescard'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'

export default function Notes({setToast}) {

    const navigate = useNavigate();
    // const [Email, setEmail] = useState('');
    const [Notes, setNotes] = useState([]);

    useEffect(()=> {
        async function fetchNotes(){
            const res = await fetch('/getnotes',{
                credentials: 'include'
            });
            const data = await res.json();
            // console.log(data);
            if(data.errors){
                navigate('/');
            }
            else{
                setNotes(data.notes);
            }
        }
        fetchNotes();
        
    }, [Notes, navigate])

    return (
        <div className='px-5 lg:px-12 font-roboto flex flex-col overflow-y-scroll h-screen'>
            <Header></Header>
            
            <div className='recent_notes text-2xl text-head font-roboto font-semibold px-2'> Your Notes </div>
            <div className='block mx-auto lg:grid lg:grid-cols-4 lg:gap-11'>
            {
                    Notes.length>0 ?
                    Notes.map((note) => {
                        return(
                            <Notescard key={note._id} id={note._id} title={note.title} desc={note.desc} setToast={setToast}/>
                        )
                    }) : <div className='py-16 text-xl font-roboto font-bold text-head flex flex-col justify-center items-center'>
                        <span class="material-icons text-6xl py-4 items-center">info</span>
                        <div>You have 0 Notes</div> 
                        <Link to='/createnotes'><button className='text-head bg-white rounded-full w-44 font-roboto text-base px-2 py-2 flex items-center  my-3 mx-4'><span className="material-icons pr-2">add_circle_outline</span>Create New Note</button></Link>
                        </div>
                    
                }
            </div>
            <div>
                <Footer></Footer>
            </div>
            
        </div>
    )
}
