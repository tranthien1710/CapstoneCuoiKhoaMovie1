
import './App.css';
import Home from 'feather/booking/utilis/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Detail from 'feather/booking/utilis/Detail';
import Booking from 'feather/booking/utilis/Booking';
import Login from 'feather/login/utilis/Login';
import Sign from 'feather/login/utilis/Sign';
import Header_movie from 'feather/booking/component/Header_movie';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProfileAction } from 'feather/login/redux/action';
import Footer from 'feather/booking/component/Footer';
import Admin from 'feather/admin/utilis/Admin';
import User from 'feather/login/utilis/User';
import Film from 'feather/admin/utilis/Film';
import Addfilm from 'feather/admin/utilis/Addfilm';
import EditFilm from 'feather/admin/utilis/EditFilm';
import Showtime from 'feather/admin/utilis/Showtime';
import Profile from 'feather/login/utilis/Profile';
import HistoryBooking from 'feather/login/utilis/HistoryBooking';
import ManagerUser from 'feather/admin/utilis/ManagerUser';
import AddUser from 'feather/admin/utilis/AddUser';
import EditUser from 'feather/admin/utilis/EditUser';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProfileAction)
  }, [])
  return (

    <BrowserRouter >
      <Header_movie />
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/booking/:id' element={<Booking />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign' element={<Sign />} />

        <Route path='/admin' element={<Admin />}>
          <Route path='/admin/manageruser' element={<ManagerUser/>} />
          <Route path="/admin/film" element={<Film />} />
          <Route path="/admin/adduser" element={<AddUser />} />
          <Route path='/admin/edituser/:matk' element={<EditUser/>}/>
          <Route path="/admin/addfilm" element={<Addfilm />} />
          <Route path="/admin/editfilm/:id" element={<EditFilm />} />
          <Route path="/admin/showtime/:id/:tenphim" element={<Showtime />} />
        </Route>
        <Route path='/user' element={<User />}>
          <Route path='/user/profile' element={<Profile />} />
         
          <Route path='/user/historybooking' element={<HistoryBooking />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
