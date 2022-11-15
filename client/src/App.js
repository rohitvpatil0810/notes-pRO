import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import CreateNotes from "./pages/CreateNotes";
import Profile from "./pages/Profile";
import { Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import UpdateNotes from "./pages/UpdateNotes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

function App() {
  const location = useLocation();
  const [Toast, setToast] = useState(0);

  if(Toast === 1){
    toast.success(' Note Created Succesfully!');
    setToast(0);
  }
  if(Toast === 2){
    toast.success(' Note Updated Succesfully!');
    setToast(0);
  }
  if(Toast === 3){
    toast.success(' Note Deleted Succesfully!');
    setToast(0);
  }
  return (
    <div className="bg-faintBlue h-full flex flex-col lg:w-screen lg:flex lg:flex-row">
      { (location.pathname !== '/') && <div><Navbar/></div> }
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="dashboard"  element={<Dashboard setToast={setToast}/>} />
        <Route path="notes" element={<Notes setToast={setToast} />} />
        <Route path="createnotes" element={<CreateNotes setToast={setToast} />} />
        <Route path="profile"  element={<Profile />} />        
        <Route path="updatenotes"  element={<UpdateNotes setToast={setToast} />} />   
        <Route path="*" element={<Navigate to="/dashboard" />} />     
      </Routes>
      
      <ToastContainer />
    </div>
  );
}

export default App;
