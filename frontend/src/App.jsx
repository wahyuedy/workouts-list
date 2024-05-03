import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext.jsx";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import AddWorkout from "./pages/AddWorkout.jsx";
import EditWorkout from "./pages/EditWorkout.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";

function App() {
  const {user} = useAuthContext()
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to='/login' />}/>
          <Route path="/add" element={user ? <AddWorkout /> : <Navigate to='/login' />}/>
          <Route path="/edit/:id" element={user ? <EditWorkout /> : <Navigate to='/login' />}/>
          <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />}/>
          <Route path="/signup" element={!user ? <SignUp /> : <Navigate to='/' />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
