import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Notescard(props) {
    const navigate = useNavigate();

    const deletenote = async () => {
        const res = await fetch(`/note/${props.id}`,{
            method: "DELETE",
            credentials: 'include'
        });
        const data = await res.json();
        if(data.errors){
            navigate('/');
        }
        else{
            props.setToast(3);
            navigate('/dashboard');
        }
    }

    return (
        <div>
            <div className='mx-2 my-4 bg-white rounded-xl px-6 py-6 w-64'>
                <div className='flex items-center'>
                    <div className="title text-xl font-semibold font-head">{props.title}</div>
                    <span onClick={deletenote} className="material-icons ml-auto text-head bg-faintBlue rounded-full p-2 hover:cursor-pointer">delete</span>
                </div>
                <div className="desc py-3 text-base">{props.desc} </div>
                <Link to='/updatenotes' state={{from: `${props.id}`}}><button className='text-head bg-faintBlue rounded-full font-roboto text-base px-2 py-2 flex items-center'><span className="material-icons pr-3">edit</span> <div className='pr-2'>Edit</div></button></Link>
            </div>
        </div>
    )
}
